# middleware/tenant_middleware.py
from django_tenants.utils import tenant_context
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from django.db import close_old_connections
from django.conf import settings
from companies.models import Domain, Company
import logging

logger = logging.getLogger(__name__)

class TenantMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        close_old_connections()

        tenant = None
        headers = request.headers
        if "retailer-domain" in headers:
            tenant_name = headers.get("retailer-domain")
            if getattr(settings, 'DEBUG', False):
                request.META['HTTP_HOST'] = f"{tenant_name}.localhost"
        else:
            host = request.get_host()
            tenant_name = host.split(':')[0]

        try:
            with tenant_context('public'):
                domain = Domain.objects.get(domain=tenant_name)
                tenant = domain.tenant
                company = Company.objects.get(client=tenant)
                setattr(request, 'company', company)

            with tenant_context(tenant):
                response = self.get_response(request)
            
            close_old_connections()
            return response

        except Domain.DoesNotExist:
            logger.error(f"Tenant not found for domain: {tenant_name}")
            return JsonResponse({'error': 'Tenant not found'}, status=404)
        except Company.DoesNotExist:
            logger.error(f"Company not found for tenant: {tenant_name}")
            return JsonResponse({'error': 'Company not found'}, status=404)
        except Exception as e:
            logger.error(f"Error in tenant resolution: {str(e)}")
            return JsonResponse({'error': 'Internal server error'}, status=500)