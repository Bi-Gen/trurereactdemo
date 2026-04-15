#--kind python:default
#--web true
# Note: this timeout is 5 minutes - 10 minutes is max allowed
#--timeout 300000
import types, os, btc_history

builder = []
## build-context ##
#--param POSTGRES_URL "$POSTGRES_URL"
import psycopg
def init_postgresql(args, ctx):
  dburl = args.get("POSTGRES_URL", os.getenv("POSTGRES_URL"))
  ctx.POSTGRESQL = psycopg.connect(dburl)
builder.append(init_postgresql)

def main(args):
  try:
    ctx = types.SimpleNamespace()
    for fn in builder: fn(args, ctx)
    result = btc_history.main(args, ctx=ctx)
    return {
      "headers": {"Content-Type": "application/json"},
      "body": result
    }
  except Exception as e:
    import traceback
    traceback.print_exc()
    return {
      "headers": {"Content-Type": "application/json"},
      "body": {"error": str(e)},
      "statusCode": 500
    }
