cli-wallet
=================

Basic Solana CLI wallet

# Usage
```sh-session
$ npm install
$ npm run build
$ npm install -g .
$ cli-wallet --help
```

# Commands
* [`cli-wallet new`](#cli-wallet-new)
* [`cli-wallet address`](#cli-wallet-address)
* [`cli-wallet balance`](#cli-wallet-balance)
* [`cli-wallet transfer`](#cli-wallet-transfer)
* [`cli-wallet token-transfer`](#cli-wallet-token-transfer)

## `cli-wallet new`

Generate an encrypted key and stores it in ~/.cli-wallet/default.key
```
USAGE
  $ cli-wallet new [-f]

FLAGS
  -f, --force  Forcefully overrides existing keypair

DESCRIPTION
  Generate an encrypted key and stores it in ~/.cli-wallet/default.key
```

## `cli-wallet address`

Display current Keypair's public key

```
USAGE
  $ cli-wallet address

DESCRIPTION
  Display current Keypair's public key
```

## `cli-wallet balance`

Display current Keypair's Solana balance

```
USAGE
  $ cli-wallet balance

DESCRIPTION
  Display current Keypair's Solana balance
```

## `cli-wallet transfer`

Transfer SOL to specified recipient

```
USAGE
  $ cli-wallet transfer AMOUNT -r <value>

FLAGS
  -r, --recipient=<value>  (required) Recipient address

DESCRIPTION
  Transfer SOL to specified recipient

EXAMPLES
  $ cli-wallet transfer 0.5 -r 6xXZbxf1p5q31h6NDjKyvtXQKihTUAZLZWGDTDqQsgGR
```

## `cli-wallet token-transfer`
Transfer SPL Token to specified recipient

```
USAGE
  $ cli-wallet token-transfer AMOUNT -t <value> -r <value>

FLAGS
  -r, --recipient=<value>  (required) Recipient address in base58
  -t, --mint=<value>       (required) Token mint address base58

DESCRIPTION
  Transfer SPL Token to specified recipient

EXAMPLES
  $ cli-wallet token-transfer 2000 -r SOMEADDRESS -t TOKENMINT
```
