import { option, leaf } from '@carnesen/cli';
import { universalOptions } from './universal-options';
import { toAbsolute, writeConfigFile } from '@carnesen/bitcoin-config';
import mkdirp = require('mkdirp');
import { dirname } from 'path';

export const write = leaf({
  commandName: 'write',
  options: {
    ...universalOptions,
    json: option({
      typeName: 'json',
      nullable: false,
      description: 'Bitcoin configuration as a JSON string',
    }),
  },
  action({ conf, json }) {
    const configFilePath = toAbsolute(conf);
    mkdirp.sync(dirname(configFilePath));
    writeConfigFile(configFilePath, json);
  },
});
