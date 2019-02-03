#!/usr/bin/env node
import { branch, cli } from '@carnesen/cli';
import { read } from './read';
import { write } from './write';
import { set } from './set';

export const bitcoinConfig = branch({
  commandName: 'bitcoin-config',
  description: `A command-line interface (CLI) for bitcoin server software configuration`,
  subcommands: [read, write, set],
});

if (module === require.main) {
  cli(bitcoinConfig)();
}
