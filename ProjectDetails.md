Project Description
============================

## Tools used
CLI framework: [oclif](https://oclif.io/)

Web3 Library: [Solana/web3.js](https://solana.com/docs/clients/javascript)

## Code organisation

All commands code are available in `./src/commands` directory

Encryption, storage and utility functionality are available in their respective directories in `./src/`

## Key storage

Private key is stored in `{USERHOME}/.cli-wallet/`

Private key is AES-CBC encrypted using a 256bit key, which is aquired by PBKDF2.

AES IV and PBKDF2 salt are generated with cryptographically secure RNG and stored alongside encrypted key.

Password is aquired by secure prompt, passing it as a flag can expose it to shell history.

Additional measure would have been to set a `chmod 600` for the key, but that wouldn't work for non-POSIX complient system. (Ehm. windows)
