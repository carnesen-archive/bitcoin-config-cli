import { testCli } from '@carnesen/cli';
import * as tempy from 'tempy';
import { init } from '../init';
import { readConfigFile } from '@carnesen/bitcoin-config';

const initCli = testCli(init);

describe(init.commandName, () => {
  it('writes the config file at provided location', async () => {
    const conf = tempy.file();
    expect(await initCli(`--conf ${conf}`)).toMatch(/^daemon=1/m);
    const config = readConfigFile(conf);
    expect(config).toEqual({ daemon: true, regtest: true });
  });
});
