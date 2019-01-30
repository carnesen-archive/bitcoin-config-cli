import { assembleCli } from '@carnesen/cli';
import { root } from '../cli';

jest.mock('download');

const assembled = assembleCli(root);

const cli = (str?: string) => {
  const argv = str ? str.split(' ') : [];
  return assembled(argv);
};

const catchExample = async (str?: string) => {
  try {
    await cli(str);
    throw Symbol();
    // ^^ This line is never meant to be reached
  } catch (ex) {
    return ex;
  }
};

describe('command-line interface', () => {
  it('throws Usage if no args are given', async () => {
    expect(await catchExample()).toMatch(/^Usage:/);
  });
});
