# @carnesen/bitcoin-config-cli [![Build Status](https://travis-ci.com/carnesen/bitcoin-config-cli.svg?branch=master)](https://travis-ci.com/carnesen/bitcoin-config-cli)
A Node.js command-line interface (CLI) for bitcoin server software configuration

## Install
```
npm install --global @carnesen/bitcoin-config-cli
```
^^ This installs this package to your global `node_modules` area. Probably you can now invoke this CLI from anywhere using the command `bitcoin-config`. If not you'll need modify your [`PATH`](https://en.wikipedia.org/wiki/PATH_(variable)).

## Usage
By default this CLI reads/writes the default bitcoin configuration file location, e.g. `~/.bitcoin/bitcoin.conf` on Linux.

The CLI can take a JSON-serialized configuration object and write it as an INI-serialized string as expected by the bitcoin server software:
```
$ bitcoin-config write --json '{"regtest": true, "daemon": true}'
```
Let's check the contents of the configuration file:
```
$ bitcoin-config read --format raw
# This is a bitcoin configuration file written using @carnesen/bitcoin-config

# Run this node on its own independent test network.
regtest=1

# Spawn bitcoin as a background process
daemon=1
```
Looks good! Now suppose later we want to set a configuration value:
```
$ bitcoin-config set --acceptnonstdtxn 1
```
The "set" command preserves existing values and adds the one(s) specified:
```
$ bitcoin-config read
{ regtest: true, daemon: true, acceptnonstdtxn: true }
```
By now there are a TON of available bitcoin configuration options:
```
$ bitcoin-config set --help
Usage: bitcoin-config set <options>

Options:

   [--acceptnonstdtxn <str>] : Relay and mine non-standard transactions
                               Allowed values {'0', '1'}
   [--addresstype <str>] : p2sh-segwit, legacy, or bech32
   [--addnode <str0> [...]] : Add a node IP address to attempt to connect to
   [--addrmantest <str>] : allows you to test address relay locally
                           Allowed values {'0', '1'}
   [--alertnotify <str>] : Execute a command when an alert or long fork is received.
                           "%s" in the command string is replaced by the alert message.
...
```

## Usage as a library
In addition to providing a CLI, this npm package can also be used as a library in conjunction with [`@carnesen/cli`](https://github.com/carnesen/cli/):

```ts
import { bitcoinConfig } from '@carnesen/bitcoin-config-cli';
import { branch, cli } from '@carnesen/cli';

export const root = branch({
  commandName: 'awesome',
  subcommands: [bitcoinConfig],
})

if (module === require.main) {
  cli(root)();
}

```

## Related
- [@carnesen/cli](https://github.com/carnesen/cli): A library for building Node.js command-line interfaces
- [@carnesen/bitcoin-config](https://github.com/carnesen/bitcoin-config): Constants, utilities, and TypeScript types for bitcoin server software configuration with Node.js

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
