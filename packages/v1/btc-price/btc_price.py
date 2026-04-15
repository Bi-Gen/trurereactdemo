import os
import urllib.request
import json
import time
import psycopg

def main(args, ctx=None):
    cache_key = f"{ctx.REDIS_PREFIX}:btc_price_eur"
    cache_ttl = 60
    
    try:
        if ctx and hasattr(ctx, 'REDIS') and ctx.REDIS:
            cached = ctx.REDIS.get(cache_key)
            if cached:
                return {"success": True, "price": float(cached), "cached": True}
        
        conn = None
        if ctx and hasattr(ctx, 'POSTGRESQL') and ctx.POSTGRESQL:
            conn = ctx.POSTGRESQL
            with conn.cursor() as cur:
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS btc_prices (
                        id SERIAL PRIMARY KEY,
                        price NUMERIC(18, 8) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """)
            conn.commit()
        
        url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur"
        req = urllib.request.Request(url, headers={"Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode("utf-8"))
            if "bitcoin" in data and "eur" in data["bitcoin"]:
                price = data["bitcoin"]["eur"]
                if ctx and hasattr(ctx, 'REDIS') and ctx.REDIS:
                    ctx.REDIS.setex(cache_key, cache_ttl, price)
                if ctx and hasattr(ctx, 'POSTGRESQL') and ctx.POSTGRESQL and conn:
                    with conn.cursor() as cur:
                        cur.execute(
                            "INSERT INTO btc_prices (price) VALUES (%s)",
                            (price,)
                        )
                    conn.commit()
                return {"success": True, "price": price, "cached": False}
            else:
                return {"error": "Failed to fetch BTC price"}
    except Exception as e:
        if ctx and hasattr(ctx, 'REDIS') and ctx.REDIS:
            cached = ctx.REDIS.get(cache_key)
            if cached:
                return {"success": True, "price": float(cached), "cached": True, "error": "Using cached value due to error"}
        return {"error": str(e)}
