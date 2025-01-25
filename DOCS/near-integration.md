# NEAR Integration Documentation

## Overview
This document describes how Sleet Key interacts with the NEAR blockchain to fetch and display account public keys.

## NEAR API Setup

### Dependencies
The application uses NEAR API JS SDK, included via CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/near-api-js@2.1.3/dist/near-api-js.min.js"></script>
```

### Configuration
The application connects to NEAR mainnet with the following configuration:

```javascript
{
    networkId: "mainnet",
    keyStore: BrowserLocalStorageKeyStore,
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org"
}
```


## Key Data Retrieval
### Process Flow
1. User enters NEAR account ID
2. Application connects to NEAR mainnet
3. Retrieves account information
4. Fetches access keys using getAccessKeys()
5. Processes and displays key information
### Data Display
The application shows the following information for each key:

- Key type (Full Access or Limited Access)
- Public key string
- For limited access keys:
  - Contract ID
  - Allowance amount (in NEAR)
## Security Considerations
### Read-Only Operations
- The application only performs read operations
- No transaction signing capabilities
- No private key access or storage
### Key Storage
- Uses BrowserLocalStorageKeyStore for temporary storage
- Only stores public information
- No sensitive data is persisted
## Export Functionality
Users can export key information as a markdown file containing:

- Account ID
- Key names (customizable)
- Key types
- Public keys
- Contract information (for limited access keys)
- Allowance information (for limited access keys)
## Technical Implementation
The main functionality is implemented in script.js through the following key functions:

### getAccountPublicKey()
- Establishes NEAR connection
- Retrieves account information
- Fetches access keys
- Returns array of key data
### Key Display
- Keys are sorted (Full Access first)
- Each key is displayed in a separate div
- Editable key names
- Metadata display for limited access keys
## Error Handling
- Connection errors are caught and displayed
- Invalid account IDs are handled gracefully
- Empty key sets are properly communicated to users