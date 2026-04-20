import random
import os

PRODUCTS_DB = {}

def generate_id():
  return random.randint(1000, 9999)

def main(args, ctx=None):
  action = args.get("action", "list")
  
  if action == "list":
    return list(PRODUCTS_DB.values())
  
  elif action == "get":
    product_id = args.get("id")
    if product_id in PRODUCTS_DB:
      return PRODUCTS_DB[product_id]
    else:
      return {"error": "Product not found", "statusCode": 404}
  
  elif action == "create":
    data = args.get("data", {})
    product_id = generate_id()
    while product_id in PRODUCTS_DB:
      product_id = generate_id()
    
    PRODUCTS_DB[product_id] = {
      "id": product_id,
      **data,
      "created_at": "2026-04-20"
    }
    return PRODUCTS_DB[product_id]
  
  elif action == "update":
    product_id = args.get("id")
    data = args.get("data", {})
    
    if product_id not in PRODUCTS_DB:
      return {"error": "Product not found", "statusCode": 404}
    
    PRODUCTS_DB[product_id].update(data)
    return PRODUCTS_DB[product_id]
  
  elif action == "delete":
    product_id = args.get("id")
    
    if product_id not in PRODUCTS_DB:
      return {"error": "Product not found", "statusCode": 404}
    
    del PRODUCTS_DB[product_id]
    return {"success": True, "message": "Product deleted"}
  
  else:
    return {"error": "Unknown action", "statusCode": 400}
