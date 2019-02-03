import { testCliThrows } from '@carnesen/cli';
import { bitcoinConfig } from '..';

const rootCliThrows = testCliThrows(bitcoinConfig);

describe(bitcoinConfig.commandName, () => {
  it('throws Usage if no args are given', async () => {
    expect(await rootCliThrows()).toMatch(/^Usage:/);
  });

  it('has 3 subcommands', async () => {
    expect(bitcoinConfig.subcommands.length).toBe(3);
  });
});
