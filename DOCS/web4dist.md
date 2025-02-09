# Web4 Distribution


using https://github.com/vgrichina/web4-min-contract

first deploy web4-min-contract
```sh
near deploy sleetkey.testnet web4-min.wasm
near deploy sleetkey.near web4-min.wasm
```

near cli network
```sh
export NEAR_NETWORK=testnet
export NEAR_NETWORK=mainnet
echo $NEAR_NETWORK 
echo $NEAR_ENV
```

deploy
```sh
npx web4-deploy web_playground sleetkey.testnet --nearfs
npx web4-deploy web_playground sleetkey.near --nearfs
```
- can be run with or without --nearfs



also locally with ipfs
```sh
ipfs add -r web_playground
```


---


git remotes
- https://github.com/sleetplayground/sleet_key.git


