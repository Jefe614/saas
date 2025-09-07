# saas/authentication.py
import os
import firebase_admin
from firebase_admin import auth, credentials
from django.contrib.auth import get_user_model
from rest_framework import authentication, exceptions

# Build absolute path to firebase-key.json
current_dir = os.path.dirname(os.path.abspath(__file__))
cred_path = os.path.join(current_dir, "firebase-key.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

User = get_user_model()

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        try:
            id_token = auth_header.split(' ').pop()
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']

            user, created = User.objects.get_or_create(
                username=uid,
                defaults={
                    'email': decoded_token.get('email', ''),
                    'first_name': decoded_token.get('name', '').split(' ')[0] if decoded_token.get('name') else '',
                    'last_name': decoded_token.get('name', '').split(' ')[-1] if decoded_token.get('name') else '',
                }
            )

            # Sync admin claim with Django staff/superuser
            is_admin = decoded_token.get("admin", False)
            if is_admin and (not user.is_staff or not user.is_superuser):
                user.is_staff = True
                user.is_superuser = True
                user.save(update_fields=["is_staff", "is_superuser"])
            elif not is_admin and (user.is_staff or user.is_superuser):
                # Optional: demote if claim removed
                user.is_staff = False
                user.is_superuser = False
                user.save(update_fields=["is_staff", "is_superuser"])

            return (user, None)

        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Invalid authentication token: {str(e)}')
