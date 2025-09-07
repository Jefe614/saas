# saas/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from firebase_admin import auth

class AssignAdminView(APIView):
    permission_classes = [permissions.IsAdminUser]  # Only Django admins can hit this

    def post(self, request):
        uid = request.data.get("uid")
        if not uid:
            return Response({"error": "UID is required"}, status=400)

        try:
            # Grant admin role in Firebase
            auth.set_custom_user_claims(uid, {"admin": True})
            return Response({"message": f"User {uid} is now an admin."})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
