#--kind python:default
#--web false
# Note: this timeout is 5 minutes - 10 minutes is max allowed
#--timeout 300000
import types, os, auth

builder = []
## build-context ##
#--param JWT_SECRET_KEY "$JWT_SECRET_KEY"
builder.append(lambda args, ctx: setattr(ctx, 'JWT_SECRET_KEY', args.get("JWT_SECRET_KEY", os.getenv("JWT_SECRET_KEY"))))

def main(args):
  try:
    ctx = types.SimpleNamespace()
    for fn in builder: fn(args, ctx)
    return { "body": auth.main(args, ctx=ctx) }
  except Exception as e:
    import traceback
    traceback.print_exc()
    return {
      "body": {"error": str(e) },
      "statusCode": 500
    }
