import psycopg

def main(args, ctx=None):
    try:
        if ctx and hasattr(ctx, 'POSTGRESQL') and ctx.POSTGRESQL:
            conn = ctx.POSTGRESQL
            with conn.cursor() as cur:
                cur.execute("SELECT id, price, created_at FROM btc_prices ORDER BY id DESC LIMIT 50")
                rows = cur.fetchall()
                prices = [{"id": row[0], "price": float(row[1]), "created_at": str(row[2])} for row in rows]
                print(f"Found {len(prices)} BTC prices in database")
                return {"success": True, "prices": prices}
        else:
            print("POSTGRESQL context not available")
            return {"error": "Database not available"}
    except Exception as e:
        print(f"Error fetching BTC history: {str(e)}")
        return {"error": str(e)}
