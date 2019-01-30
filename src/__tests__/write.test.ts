import { testCli } from '@carnesen/cli';
import * as tempy from 'tempy';
import { write } from '../write';
import { readConfigFile } from '@carnesen/bitcoin-config';

const writeCli = testCli(write);

describe(write.commandName, () => {
  it('writes the config file at provided location', async () => {
    const conf = tempy.file();
    expect(await writeCli(`--conf ${conf} --json {"daemon":true}`)).toMatch(/^daemon=1/m);
    const config = readConfigFile(conf);
    expect(config).toEqual({ daemon: true });
  });
});
