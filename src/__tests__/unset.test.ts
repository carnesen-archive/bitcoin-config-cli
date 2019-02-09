import { testCli, testCliThrows } from '@carnesen/cli';
import * as tempy from 'tempy';
import { unset } from '../unset';
import { readConfigFile } from '@carnesen/bitcoin-config';
import tempWrite = require('temp-write');

const cli = testCli(unset);
const cliThrows = testCliThrows(unset);

describe(unset.commandName, () => {
  it('unsets the provided values in the config file', async () => {
    const filePath = await tempWrite('daemon=1\nbanscore=10');
    expect(await cli(`--conf ${filePath} --daemon`));
    const config = readConfigFile(filePath);
    expect(config).toEqual({ banscore: 10 });
  });

  it('throws "one or more configuration values" if no config option is provided', async () => {
    const conf = tempy.file();
    expect(await cliThrows(`--conf ${conf}`)).toMatch('one or more configuration values');
  });
});
