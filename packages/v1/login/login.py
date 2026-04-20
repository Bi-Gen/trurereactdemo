import jwt
import hashlib
import random
import string
import os
from datetime import datetime, timedelta

USERS_DB = {
  "admin": {
    "password": hashlib.sha256("admin123".encode()).hexdigest(),
    "email": "admin@example.com",
    "name": "Administrator"
  }
}

def generate_token(username: str) -> str:
  payload = {
    "username": username,
    "exp": datetime.utcnow() + timedelta(hours=24),
    "iat": datetime.utcnow()
  }
  secret = os.environ.get("JWT_SECRET_KEY", "SECRET_KEY")
  return jwt.encode(payload, secret, algorithm="HS256")

def verify_token(token: str) -> dict | None:
  try:
    secret = os.environ.get("JWT_SECRET_KEY", "SECRET_KEY")
    payload = jwt.decode(token, secret, algorithms=["HS256"])
    return payload
  except:
    return None

def hash_password(password: str) -> str:
  return hashlib.sha256(password.encode()).hexdigest()

def generate_random_password(length: int = 12) -> str:
  chars = string.ascii_letters + string.digits + "!@#$%^&*"
  return ''.join(random.choice(chars) for _ in range(length))

def main(args, ctx=None):
  action = args.get("action", "login")
  
  if action == "login":
    username = args.get("username")
    password = args.get("password")
    
    if not username or not password:
      return {"error": "Username and password required", "statusCode": 400}
    
    hashed_pwd = hash_password(password)
    
    if username in USERS_DB and USERS_DB[username]["password"] == hashed_pwd:
      token = generate_token(username)
      return {
        "success": True,
        "token": token,
        "user": {
          "username": username,
          "email": USERS_DB[username]["email"],
          "name": USERS_DB[username]["name"]
        }
      }
    else:
      return {"error": "Invalid credentials", "statusCode": 401}
  
  elif action == "register":
    username = args.get("username")
    password = args.get("password")
    email = args.get("email", "")
    name = args.get("name", "")
    
    if not username or not password:
      return {"error": "Username and password required", "statusCode": 400}
    
    if username in USERS_DB:
      return {"error": "Username already exists", "statusCode": 409}
    
    if not email:
      email = f"{username}@example.com"
    
    USERS_DB[username] = {
      "password": hash_password(password),
      "email": email,
      "name": name
    }
    
    token = generate_token(username)
    
    return {
      "success": True,
      "token": token,
      "user": {
        "username": username,
        "email": email,
        "name": name
      }
    }
  
  elif action == "verify":
    token = args.get("token")
    if not token:
      return {"error": "Token required", "statusCode": 400}
    
    payload = verify_token(token)
    if payload:
      return {"valid": True, "username": payload["username"]}
    else:
      return {"valid": False, "error": "Invalid or expired token", "statusCode": 401}
  
  elif action == "logout":
    return {"success": True, "message": "Logged out successfully"}
  
  else:
    return {"error": "Unknown action", "statusCode": 400}
