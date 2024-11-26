import requests
import markdown

def get_near_account_keys(account_id):
    url = f"https://rpc.mainnet.near.org"
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "query",
        "params": {
            "request_type": "view_access_key_list",
            "finality": "final",
            "account_id": account_id
        }
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json()["result"]["keys"]
    else:
        return []

def save_keys_to_markdown(account_id, keys):
    md_content = f"# {account_id}\naccount keys\n"
    for i, key in enumerate(keys):
        key_type = "full" if key.get("access_key").get("permission") == "FullAccess" else "limited"
        md_content += f"## KEY NAME {i + 1}\n{key_type}\n```\n{key['public_key']}\n```\n"

    with open(f"{account_id}.md", "w") as f:
        f.write(md_content)
    print(f"Keys saved to {account_id}.md")

if __name__ == "__main__":
    account_id = input("Enter the NEAR account ID (e.g., account.near): ")
    keys = get_near_account_keys(account_id)
    if keys:
        save_keys_to_markdown(account_id, keys)
    else:
        print("No keys found for the specified account.")
