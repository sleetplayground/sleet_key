const nearAPI = require("near-api-js");
const { connect, keyStores, KeyPair } = nearAPI;
const keyStore = new keyStores.BrowserLocalStorageKeyStore();

async function getAccountPublicKey(accountId) {
    const config = {
        networkId: "mainnet",
        keyStore,
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
    };

    const near = await connect(config);
    const account = await near.account(accountId);
    const accessKeys = await account.getAccessKeys();
    return accessKeys;
}

document.querySelector('.key_search_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const accountId = document.querySelector('#key_search_input').value;

    const keys = await getAccountPublicKey(accountId);

    if (keys.length > 0) {
        document.querySelector('.key_type').textContent = keys[0].access_key.permission.FunctionCall.receiver_id;
        document.querySelector('.ed25519').textContent = keys[0].public_key;
    }
});

document.querySelector('.key_save').addEventListener('click', () => {
    const accountId = document.querySelector('#key_search_input').value;
    const keyName = document.querySelector('h2[contenteditable="true"]').textContent;
    const keyType = document.querySelector('.key_type').textContent;
    const publicKey = document.querySelector('.ed25519').textContent;

    const markdownContent = `# ${accountId}\naccount keys\n## ${keyName}\n${keyType}\n\`\`\`\n${publicKey}\n\`\`\``;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${accountId}.md`;
    a.click();
});
