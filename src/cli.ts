#!/usr/bin/env node
// This is the entry point for the `bitcoin-config` command-line interface.
// The source code is written in TypeScript and compiled to JavaScript.

import { cli } from '@carnesen/cli';
import { root } from './root';

if (module === require.main) {
  cli(root)();
}
