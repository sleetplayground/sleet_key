from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    account_id = request.json.get('account_id')
    keys = get_near_account_keys(account_id)
    return jsonify(keys)

if __name__ == '__main__':
    app.run(debug=True)
