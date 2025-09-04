from django.db.models.signals import post_save
from django.dispatch import receiver
from companies.models import Client, Domain

@receiver(post_save, sender=Client)
def create_tenant_domain(sender, instance, created, **kwargs):
    if created:
        subdomain = instance.schema_name
        full_domain = subdomain

        if not Domain.objects.filter(domain=full_domain).exists():
            Domain.objects.create(
                domain=full_domain,
                tenant=instance,
                is_primary=True
            )
