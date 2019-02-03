import { testCli } from '@carnesen/cli';
import * as tempy from 'tempy';
import { read } from '../read';
import { writeConfigFile } from '@carnesen/bitcoin-config';

const readCli = testCli(read);

describe(read.commandName, () => {
  it('reads and prints the contents of file "conf"', async () => {
    const conf = tempy.file();
    writeConfigFile(conf, { daemon: true });
    expect(await readCli(`--conf ${conf} --format raw`)).toMatch(/^daemon=1/m);
  });

  it('parses and serializes the file to json if --format json is passed', async () => {
    const conf = tempy.file();
    writeConfigFile(conf, { daemon: true });
    expect(await readCli(`--conf ${conf} --format json`)).toMatch(/"daemon": true/m);
  });

  it('parses and pretty prints the contents if --format pretty is passed', async () => {
    const conf = tempy.file();
    writeConfigFile(conf, { daemon: true });
    expect(await readCli(`--conf ${conf} --format pretty`)).toEqual({ daemon: true });
  });
});
