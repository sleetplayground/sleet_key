const nearAPI = window.nearApi;

document.getElementById('create-keypair').addEventListener('click', async () => {
    try {
        // Generate a new keypair
        const keyPair = nearAPI.utils.KeyPair.fromRandom('ed25519');
        const publicKey = keyPair.getPublicKey().toString();
        const privateKey = keyPair.secretKey;

        // Create HTML elements to display the keypair
        const keypairDiv = document.createElement('div');
        keypairDiv.className = 'keypair-div';

        const title = document.createElement('h2');
        title.textContent = 'Generated Keypair';

        // Public Key section
        const publicKeyLabel = document.createElement('div');
        publicKeyLabel.className = 'key-label';
        publicKeyLabel.textContent = 'Public Key';

        const publicKeyValue = document.createElement('div');
        publicKeyValue.className = 'key-value';
        publicKeyValue.textContent = publicKey;

        // Private Key section
        const privateKeyLabel = document.createElement('div');
        privateKeyLabel.className = 'key-label';
        privateKeyLabel.textContent = 'Private Key';

        const privateKeyValue = document.createElement('div');
        privateKeyValue.className = 'key-value';
        privateKeyValue.textContent = Buffer.from(privateKey).toString('base64');

        const warning = document.createElement('p');
        warning.className = 'warning-text';
        warning.textContent = 'Warning: Save your private key securely. It cannot be recovered if lost.';

        // Append all elements
        keypairDiv.appendChild(title);
        keypairDiv.appendChild(publicKeyLabel);
        keypairDiv.appendChild(publicKeyValue);
        keypairDiv.appendChild(privateKeyLabel);
        keypairDiv.appendChild(privateKeyValue);
        keypairDiv.appendChild(warning);

        // Add to container
        const container = document.getElementById('keypair-container');
        container.insertBefore(keypairDiv, container.firstChild);

    } catch (error) {
        console.error('Error generating keypair:', error);
        alert('Error generating keypair. Please try again.');
    }
});