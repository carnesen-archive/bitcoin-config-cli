import { testCliThrows } from '@carnesen/cli';
import { root } from '../root';

const rootCliThrows = testCliThrows(root);

describe(root.commandName, () => {
  it('throws Usage if no args are given', async () => {
    expect(await rootCliThrows()).toMatch(/^Usage:/);
  });

  it('has 3 subcommands', async () => {
    expect(root.subcommands.length).toBe(3);
  });
});
