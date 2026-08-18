import base64
import hashlib
import json
import os
import subprocess
import time
import urllib.request

REPO = "yt-91/zhiji-medical"
API = f"https://api.github.com/repos/{REPO}/git"
TOKEN = os.environ["GH_TOKEN"]
ROOT = os.path.dirname(os.path.abspath(__file__))
BASE = "62cd5bc58e7f4e7f6fe654868e9f223f2c358d20"  # 我误推之前的远端良好状态

def req(method, url, data=None, retries=4):
    body = json.dumps(data).encode() if data is not None else None
    for attempt in range(retries):
        try:
            r = urllib.request.Request(url, data=body, method=method, headers={
                "Authorization": f"Bearer {TOKEN}",
                "Accept": "application/vnd.github+json",
                "Content-Type": "application/json",
                "User-Agent": "kimi-deploy",
            })
            with urllib.request.urlopen(r, timeout=90) as resp:
                return json.loads(resp.read().decode())
        except Exception:
            if attempt == retries - 1:
                raise
            time.sleep(5 * (attempt + 1))

def blob_sha(path):
    with open(path, "rb") as f:
        data = f.read()
    return hashlib.sha1(b"blob %d\x00" % len(data) + data).hexdigest()

# 1. 取误推前远端树
base_tree = req("GET", f"{API}/commits/{BASE}")["tree"]["sha"]
good = {e["path"]: e for e in req("GET", f"{API}/trees/{base_tree}?recursive=1")["tree"] if e["type"] == "blob"}

# 2. 需要恢复/纠正的路径：远端良好状态里有、但与本地不一致的文件
restore = []
for path, e in good.items():
    local_path = os.path.join(ROOT, path)
    if not os.path.exists(local_path) or blob_sha(local_path) != e["sha"]:
        blob = req("GET", f"{API}/blobs/{e['sha']}")
        data = base64.b64decode(blob["content"])
        os.makedirs(os.path.dirname(local_path) or ROOT, exist_ok=True)
        with open(local_path, "wb") as f:
            f.write(data)
        restore.append({"path": path, "mode": e["mode"], "type": "blob", "sha": e["sha"]})
        print("restore", path)

# 3. 本地多出来的旧 miniapp 资源（良好状态里没有的）删除
for path in ["miniapp/assets/index-BQOrgsEc.js", "miniapp/assets/index-Cj_tuMaz.css"]:
    if path not in good:
        local_path = os.path.join(ROOT, path)
        if os.path.exists(local_path):
            os.remove(local_path)
        restore.append({"path": path, "mode": "100644", "type": "blob", "sha": None})
        print("remove", path)

# 4. 在当前远端之上提交修复
cur_sha = req("GET", f"{API}/refs/heads/main")["object"]["sha"]
cur_tree = req("GET", f"{API}/commits/{cur_sha}")["tree"]["sha"]
tree = req("POST", f"{API}/trees", {"base_tree": cur_tree, "tree": restore})
commit = req("POST", f"{API}/commits", {
    "message": "fix: 恢复 miniapp 新版文件与 .nojekyll（同步远端良好状态）",
    "tree": tree["sha"],
    "parents": [cur_sha],
})
req("PATCH", f"{API}/refs/heads/main", {"sha": commit["sha"], "force": False})
print("restored:", commit["sha"])

subprocess.run(["git", "add", "-A"], cwd=ROOT, check=True)
subprocess.run(["git", "-c", "user.name=kimi-work", "-c", "user.email=deploy@local",
                "commit", "-m", "sync: 同步远端良好状态到本地", "--quiet"], cwd=ROOT, check=True)
print("local synced")
