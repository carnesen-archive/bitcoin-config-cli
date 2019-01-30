import { cli, branch } from '@carnesen/cli';
import { read } from './read';
import { set } from './set';
import { write } from './write';

export const root = branch({
  commandName: 'bitcoin-config',
  description: `A command-line interface (CLI) for bitcoin server software configuration`,
  subcommands: [read, write, set],
});

if (module === require.main) {
  cli(root);
}
