import psycopg

def main(args, ctx=None):
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
        return {"success": True, "message": "Table btc_prices created/verified"}
    return {"success": False, "message": "PostgreSQL not available"}
