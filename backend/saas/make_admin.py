import firebase_admin
from firebase_admin import auth, credentials
import os


current_dir = os.path.dirname(os.path.abspath(__file__))
cred_path = os.path.join(current_dir, "firebase-key.json")

cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

# Replace with real UID from Firebase Authentication
uid = "7YGShWhR3USahtpJNrJsjm8taVd2"
auth.set_custom_user_claims(uid, {"admin": True})

print(f"User {uid} is now an admin!")
