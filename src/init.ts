import { leaf } from '@carnesen/cli';
import { universalOptions } from './universal-options';
import { toAbsolute, writeConfigFile } from '@carnesen/bitcoin-config';
import mkdirp = require('mkdirp');
import { dirname } from 'path';

export const init = leaf({
  commandName: 'init',
  description: 'Initialize a bitcoin configuration file',
  options: {
    ...universalOptions,
  },
  action({ conf }) {
    const configFilePath = toAbsolute(conf);
    mkdirp.sync(dirname(configFilePath));
    const { serializedConfig } = writeConfigFile(configFilePath, {
      regtest: true,
      daemon: true,
    });
    return serializedConfig;
  },
});
