import { testCli, testCliThrows } from '@carnesen/cli';
import * as tempy from 'tempy';
import { set } from '../set';
import { readConfigFile } from '@carnesen/bitcoin-config';

const cli = testCli(set);
const cliThrows = testCliThrows(set);

describe(set.commandName, () => {
  it('writes the provided values to the config file', async () => {
    const conf = tempy.file();
    expect(await cli(`--conf ${conf} --daemon 1 --banscore 10`));
    const config = readConfigFile(conf);
    expect(config).toEqual({ daemon: true, banscore: 10 });
  });

  it('throws "one or more configuration values" if no config option is provided', async () => {
    const conf = tempy.file();
    expect(await cliThrows(`--conf ${conf}`)).toMatch('one or more configuration values');
  });
});
