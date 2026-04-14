#--kind python:default
#--web true
# Note: this timeout is 5 minutes - 10 minutes is max allowed
#--timeout 300000
import types, os, git_issue

builder = []
## build-context ##
#--param GH_TOKEN "$GH_TOKEN"
builder.append(lambda args, ctx: setattr(ctx, 'GH_TOKEN', args.get("GH_TOKEN", os.getenv("GH_TOKEN"))))

def main(args):
  try:
    ctx = types.SimpleNamespace()
    for fn in builder: fn(args, ctx)
    return { "body": git_issue.main(args, ctx=ctx) }
  except Exception as e:
    import traceback
    traceback.print_exc()
    return {
      "body": {"error": str(e) },
      "statusCode": 500
    }
