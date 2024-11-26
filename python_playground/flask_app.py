from flask import Flask, request, jsonify, render_template_string
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
    return render_template_string('''
    <header>
        <h1>SLEET KEY</h1>
        <p>Label your NEAR account keys</p>

        <form class="key_search_form" onsubmit="searchKeys(); return false;">
            <input type="text" placeholder="account.near" name="key_search_input" id="key_search_input">
            <button type="submit">SEARCH</button>
        </form>
    </header>
    <article id="key_container">
        <!-- Key divs will be dynamically added here -->
    </article>
    <button class="key_save" onclick="saveKeys()">SAVE</button>

    <script>
        async function searchKeys() {
            const accountId = document.getElementById('key_search_input').value;
            const response = await fetch('/search', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({account_id: accountId})
            });
            const keys = await response.json();
            const keyContainer = document.getElementById('key_container');
            keyContainer.innerHTML = ''; // Clear previous results

            keys.forEach((key, index) => {
                const keyDiv = document.createElement('div');
                keyDiv.className = 'key_div';

                const keyName = document.createElement('h2');
                keyName.contentEditable = 'true';
                keyName.textContent = `KEY NAME ${index + 1}`;

                const keyType = document.createElement('p');
                keyType.className = 'key_type';
                keyType.textContent = key.access_key.permission === 'FullAccess' ? 'full' : 'limited';

                const publicKey = document.createElement('p');
                publicKey.className = 'ed25519';
                publicKey.textContent = key.public_key;

                keyDiv.appendChild(keyName);
                keyDiv.appendChild(keyType);
                keyDiv.appendChild(publicKey);

                keyContainer.appendChild(keyDiv);
            });
        }

        function saveKeys() {
            const accountId = document.getElementById('key_search_input').value;
            const keyDivs = document.querySelectorAll('.key_div');
            let markdownContent = `# ${accountId}\naccount keys\n`;

            keyDivs.forEach(keyDiv => {
                const keyName = keyDiv.querySelector('h2').textContent;
                const keyType = keyDiv.querySelector('.key_type').textContent;
                const publicKey = keyDiv.querySelector('.ed25519').textContent;

                markdownContent += `## ${keyName}\n${keyType}\n\`\`\`\n${publicKey}\n\`\`\`\n`;
            });

            const blob = new Blob([markdownContent], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${accountId}.md`;
            a.click();
        }
    </script>
    ''')

@app.route('/search', methods=['POST'])
def search():
    account_id = request.json.get('account_id')
    keys = get_near_account_keys(account_id)
    return jsonify(keys)

if __name__ == '__main__':
    app.run(debug=True)
