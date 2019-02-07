#!/usr/bin/env node
import { branch, cli } from '@carnesen/cli';
import { read } from './read';
import { write } from './write';
import { set } from './set';
import { unset } from './unset';

export const bitcoinConfig = branch({
  commandName: 'bitcoin-config',
  description: 'Configure bitcoin server software',
  subcommands: [read, write, set, unset],
});

if (module === require.main) {
  cli(bitcoinConfig)();
}
