const nearAPI = window.nearApi;

const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

async function getAccountPublicKey(accountId) {
    try {
        const config = {
            networkId: "mainnet",
            keyStore,
            nodeUrl: "https://rpc.mainnet.near.org",
            walletUrl: "https://wallet.mainnet.near.org",
            helperUrl: "https://helper.mainnet.near.org",
        };

        console.log('Connecting to NEAR with config:', config);
        const near = await nearAPI.connect(config);
        
        console.log('Getting account for:', accountId);
        const account = await near.account(accountId);
        
        console.log('Fetching access keys...');
        const accessKeys = await account.getAccessKeys();
        console.log('Access keys received:', accessKeys);
        
        return accessKeys;
    } catch (error) {
        console.error('Error fetching keys:', error);
        throw error;
    }
}

document.querySelector('.key_search_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const accountId = document.querySelector('#key_search_input').value;
    const keyContainer = document.getElementById('key_container');
    keyContainer.innerHTML = ''; // Clear previous results

    try {
        const keys = await getAccountPublicKey(accountId);

        if (!keys || keys.length === 0) {
            keyContainer.innerHTML = '<p class="error">No keys found for this account</p>';
            return;
        }
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
    } catch (error) {
        console.error('Error:', error);
        keyContainer.innerHTML = `<p class="error">Error fetching keys: ${error.message}</p>`;
        return;
    }
}); // Close the submit event listener




document.querySelector('.key_save').addEventListener('click', () => {
    const accountId = document.querySelector('#key_search_input').value;
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
});
