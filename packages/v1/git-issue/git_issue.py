import os
import urllib.request
import json

def main(args, ctx=None):
    repo = os.environ.get("GH_REPO", "Bi-Gen/trurereactdemo")
    token = ctx.GH_TOKEN if ctx and hasattr(ctx, "GH_TOKEN") else os.environ.get("GH_TOKEN")

    if not token:
        return {"error": "GH_TOKEN not configured"}

    title = args.get("title", "")
    body = args.get("body", "")

    if not title or not body:
        return {"error": "Title and body are required"}

    url = f"https://api.github.com/repos/{repo}/issues"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    }
    data = json.dumps({"title": title, "body": body}).encode("utf-8")

    try:
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            return {"success": True, "issue": result}
    except Exception as e:
        return {"error": str(e)}
