# views.py
from companies.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from decimal import Decimal
import logging
from companies.serializers import CategorySerializer, ProductSerializer
from companies.models import Category, Product, StoreConfig

logger = logging.getLogger(__name__)

class ProductAPIView(APIView):
    """API for products management"""
    # permission_classes = [IsAdminUser]

    def get(self, request):
        """Get all products for the user"""
        try:
            user = request.user
            logger.debug(f"Fetching products for user: {user.username}")

            # Get store config for additional metadata
            try:
                store_config = StoreConfig.objects.get(user=user)
                store_name = store_config.store_name
            except StoreConfig.DoesNotExist:
                store_name = "My Store"
                logger.warning(f"No StoreConfig found for user: {user.username}")

            products = Product.objects.filter(user=user).order_by('-id')
            serializer = ProductSerializer(products, many=True)

            return Response({
                'products': serializer.data,
                'total': len(serializer.data),
                'store': {
                    'name': store_name,
                    'owner': user.username
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error fetching products: {str(e)}")
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        """Create a new product"""
        try:
            user = request.user
            logger.debug(f"Creating product for user: {user.username}")

            data = request.data

            # Validate required fields
            required_fields = ['name', 'price']
            for field in required_fields:
                if field not in data or data[field] is None or data[field] == '':
                    return Response(
                        {'error': f'{field} is required'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Validate price
            try:
                price = Decimal(str(data['price']))
                if price < 0:
                    return Response(
                        {'error': 'Price cannot be negative'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except (TypeError, ValueError, Decimal.InvalidOperation):
                return Response(
                    {'error': 'Invalid price format'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Validate original_price if provided
            original_price = None
            if data.get('originalPrice'):
                try:
                    original_price = Decimal(str(data['originalPrice']))
                    if original_price < 0:
                        return Response(
                            {'error': 'Original price cannot be negative'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                except (TypeError, ValueError, Decimal.InvalidOperation):
                    return Response(
                        {'error': 'Invalid original price format'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Validate rating
            try:
                rating = float(data.get('rating', 0))
                if not (0 <= rating <= 5):
                    return Response(
                        {'error': 'Rating must be between 0 and 5'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except (TypeError, ValueError):
                return Response(
                    {'error': 'Invalid rating format'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Validate reviews_count
            try:
                reviews_count = int(data.get('reviews', 0))
                if reviews_count < 0:
                    return Response(
                        {'error': 'Reviews count cannot be negative'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except (TypeError, ValueError):
                return Response(
                    {'error': 'Invalid reviews count format'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create product
            product = Product.objects.create(
                user=user,
                name=data.get('name', ''),
                description=data.get('description', ''),
                price=price,
                original_price=original_price,
                image=data.get('image', ''),
                rating=rating,
                reviews_count=reviews_count,
                is_available=data.get('inStock', True),
                badge=data.get('badge', None)
            )

            # Handle categories
            category_names = data.get('categories', [])
            if isinstance(category_names, str):
                category_names = [category_names]

            for cat_name in category_names:
                if not cat_name:
                    continue
                category, created = Category.objects.get_or_create(
                    user=user,
                    name=cat_name,
                    defaults={'description': f'{cat_name} products'}
                )
                product.categories.add(category)

            logger.info(f"Created product {product.id} for user: {user.username}")
            return Response({
                'message': 'Product created successfully',
                'product_id': product.id,
                'user': user.username
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Error creating product: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, product_id=None):
        """Update a product"""
        if not product_id:
            return Response({'error': 'Product ID required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = request.user
            logger.debug(f"Updating product {product_id} for user: {user.username}")

            product = Product.objects.get(id=product_id, user=user)
            data = request.data

            # Update fields with validation
            if 'name' in data and data['name'] is not None:
                if data['name'] == '':
                    return Response(
                        {'error': 'Name cannot be empty'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                product.name = data['name']

            if 'description' in data:
                product.description = data['description'] or ''

            if 'price' in data:
                try:
                    price = Decimal(str(data['price']))
                    if price < 0:
                        return Response(
                            {'error': 'Price cannot be negative'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    product.price = price
                except (TypeError, ValueError, Decimal.InvalidOperation):
                    return Response(
                        {'error': 'Invalid price format'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            if 'originalPrice' in data and data['originalPrice'] is not None:
                try:
                    original_price = Decimal(str(data['originalPrice']))
                    if original_price < 0:
                        return Response(
                            {'error': 'Original price cannot be negative'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    product.original_price = original_price
                except (TypeError, ValueError, Decimal.InvalidOperation):
                    return Response(
                        {'error': 'Invalid original price format'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            if 'image' in data:
                product.image = data['image'] or ''

            if 'rating' in data and data['rating'] is not None:
                try:
                    rating = float(data['rating'])
                    if not (0 <= rating <= 5):
                        return Response(
                            {'error': 'Rating must be between 0 and 5'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    product.rating = rating
                except (TypeError, ValueError):
                    return Response(
                        {'error': 'Invalid rating format'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            if 'reviews' in data and data['reviews'] is not None:
                try:
                    reviews_count = int(data['reviews'])
                    if reviews_count < 0:
                        return Response(
                            {'error': 'Reviews count cannot be negative'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    product.reviews_count = reviews_count
                except (TypeError, ValueError):
                    return Response(
                        {'error': 'Invalid reviews count format'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            if 'inStock' in data:
                product.is_available = data['inStock']

            if 'badge' in data:
                product.badge = data['badge']

            product.save()

            # Update categories
            if 'categories' in data:
                product.categories.clear()
                category_names = data['categories']
                if isinstance(category_names, str):
                    category_names = [category_names]

                for cat_name in category_names:
                    if not cat_name:
                        continue
                    category, created = Category.objects.get_or_create(
                        user=user,
                        name=cat_name,
                        defaults={'description': f'{cat_name} products'}
                    )
                    product.categories.add(category)

            logger.info(f"Updated product {product_id} for user: {user.username}")
            return Response({
                'message': 'Product updated successfully',
                'user': user.username
            }, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            logger.error(f"Product {product_id} not found for user: {user.username}")
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error updating product {product_id}: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, product_id=None):
        """Delete a product"""
        if not product_id:
            return Response({'error': 'Product ID required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = request.user
            logger.debug(f"Deleting product {product_id} for user: {user.username}")

            product = Product.objects.get(id=product_id, user=user)
            product.delete()
            logger.info(f"Deleted product {product_id} for user: {user.username}")
            return Response({
                'message': 'Product deleted successfully',
                'user': user.username
            }, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            logger.error(f"Product {product_id} not found for user: {user.username}")
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error deleting product {product_id}: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class CategoryAPIView(APIView):
    """API for categories management"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get all categories for the user"""
        try:
            user = request.user
            logger.debug(f"Fetching categories for user: {user.username}")

            # Get store config for additional metadata
            try:
                store_config = StoreConfig.objects.get(user=user)
                store_name = store_config.store_name
            except StoreConfig.DoesNotExist:
                store_name = "My Store"
                logger.warning(f"No StoreConfig found for user: {user.username}")

            categories = Category.objects.filter(user=user).order_by('name')
            serializer = CategorySerializer(categories, many=True)

            return Response({
                'categories': serializer.data,
                'total': len(serializer.data),
                'store': {
                    'name': store_name,
                    'owner': user.username
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error fetching categories: {str(e)}")
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        """Create a new category"""
        try:
            user = request.user
            logger.debug(f"Creating category for user: {user.username}")

            data = request.data

            # Validate required fields
            if 'name' not in data or not data['name']:
                return Response(
                    {'error': 'Name is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check if category already exists for this user
            if Category.objects.filter(user=user, name=data['name']).exists():
                return Response(
                    {'error': 'Category with this name already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create category
            category = Category.objects.create(
                user=user,
                name=data['name'],
                description=data.get('description', ''),
                image=data.get('image', '')
            )

            logger.info(f"Created category {category.id} for user: {user.username}")
            return Response({
                'message': 'Category created successfully',
                'category_id': category.id,
                'user': user.username
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Error creating category: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, category_id=None):
        """Update a category"""
        if not category_id:
            return Response({'error': 'Category ID required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = request.user
            logger.debug(f"Updating category {category_id} for user: {user.username}")

            category = Category.objects.get(id=category_id, user=user)
            data = request.data

            # Update fields with validation
            if 'name' in data and data['name'] is not None:
                if data['name'] == '':
                    return Response(
                        {'error': 'Name cannot be empty'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                # Check if another category with this name exists
                if Category.objects.filter(user=user, name=data['name']).exclude(id=category_id).exists():
                    return Response(
                        {'error': 'Category with this name already exists'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                category.name = data['name']

            if 'description' in data:
                category.description = data['description'] or ''

            if 'image' in data:
                category.image = data['image'] or ''

            category.save()

            logger.info(f"Updated category {category_id} for user: {user.username}")
            return Response({
                'message': 'Category updated successfully',
                'user': user.username
            }, status=status.HTTP_200_OK)

        except Category.DoesNotExist:
            logger.error(f"Category {category_id} not found for user: {user.username}")
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error updating category {category_id}: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, category_id=None):
        """Delete a category"""
        if not category_id:
            return Response({'error': 'Category ID required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = request.user
            category = Category.objects.get(id=category_id, user=user)
            category.delete()
            return Response({
                'message': 'Category deleted successfully',
                'user': user.username
            }, status=status.HTTP_200_OK)

        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)