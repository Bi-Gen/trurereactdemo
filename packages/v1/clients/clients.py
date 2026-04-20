import random
import os

CLIENTS_DB = {}

def generate_id():
  return random.randint(1000, 9999)

def main(args, ctx=None):
  action = args.get("action", "list")
  
  if action == "list":
    return list(CLIENTS_DB.values())
  
  elif action == "get":
    client_id = args.get("id")
    if client_id in CLIENTS_DB:
      return CLIENTS_DB[client_id]
    else:
      return {"error": "Client not found", "statusCode": 404}
  
  elif action == "create":
    data = args.get("data", {})
    client_id = generate_id()
    while client_id in CLIENTS_DB:
      client_id = generate_id()
    
    CLIENTS_DB[client_id] = {
      "id": client_id,
      **data,
      "created_at": "2026-04-20"
    }
    return CLIENTS_DB[client_id]
  
  elif action == "update":
    client_id = args.get("id")
    data = args.get("data", {})
    
    if client_id not in CLIENTS_DB:
      return {"error": "Client not found", "statusCode": 404}
    
    CLIENTS_DB[client_id].update(data)
    return CLIENTS_DB[client_id]
  
  elif action == "delete":
    client_id = args.get("id")
    
    if client_id not in CLIENTS_DB:
      return {"error": "Client not found", "statusCode": 404}
    
    del CLIENTS_DB[client_id]
    return {"success": True, "message": "Client deleted"}
  
  else:
    return {"error": "Unknown action", "statusCode": 400}
