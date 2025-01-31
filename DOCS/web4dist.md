# Web4 Distribution


using https://github.com/vgrichina/web4-min-contract

first deploy web4-min-contract
```sh
near deploy key.sleet.testnet web4-min.wasm
near deploy key.sleet.near web4-min.wasm
```

near cli network
```sh
export NEAR_NETWORK=testnet
export NEAR_NETWORK=mainnet
echo $NEAR_NETWORK 
echo $NEAR_ENV
```

deploy
(deployed fine to tesnet)
```sh
npx web4-deploy web_playground key.sleet.testnet --nearfs
npx web4-deploy web_playground key.sleet.near --nearfs
```
- can be run with or without --nearfs

get ipf url from last command
```sh
near call <contract_id> <method_name> '{"url":"ipfs://bafybeig4p2xmu5or2irnyi6sjiir472busbswdegsk2jjyjnrmihle2rfe"}'

near call key.sleet.testnet web4_setStaticUrl  '{"url":"ipfs://bafybeig4p2xmu5or2irnyi6sjiir472busbswdegsk2jjyjnrmihle2rfe"}' --use-account  key.sleet.testnet

near call key.sleet.near web4_setStaticUrl  '{"url":"ipfs://bafybeig4p2xmu5or2irnyi6sjiir472busbswdegsk2jjyjnrmihle2rfe"}' --use-account key.sleet.near
```


also locally with ipfs
```sh
ipfs add -r web_playground
```


---


git remotes
- https://gitlab.com/the-sunshining/Sunny-Stuff/web3/sleet_key
- https://github.com/sleetplayground/sleet_key.git

```sh
git remote add github https://github.com/sleetplayground/sleet_key.git
git push -u github main
```