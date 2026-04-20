import os
import jwt

def main(args, ctx=None):
  action = args.get("action", "verify")
  
  if action == "verify":
    token = args.get("token")
    if not token:
      return {"error": "Token required", "statusCode": 400}
    
    try:
      secret = os.environ.get("JWT_SECRET_KEY", "SECRET_KEY")
      payload = jwt.decode(token, secret, algorithms=["HS256"])
      return {"valid": True, "username": payload["username"]}
    except Exception as e:
      return {"valid": False, "error": str(e), "statusCode": 401}
  
  else:
    return {"error": "Unknown action", "statusCode": 400}
