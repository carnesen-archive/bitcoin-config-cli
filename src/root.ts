import { branch } from '@carnesen/cli';
import { read } from './read';
import { write } from './write';
import { init } from './init';

export const root = branch({
  commandName: 'bitcoin-config',
  description: `A command-line interface (CLI) for bitcoin server software configuration`,
  subcommands: [read, write, init],
});
