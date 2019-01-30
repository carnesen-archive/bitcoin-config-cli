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
      description: 'Bitcoin configuration as a JSON string',
    }),
    mkdir: option({
      typeName: 'boolean',
      description: 'Create the directory if it does not exist',
    }),
  },
  action({ conf, json, mkdir }) {
    const configFilePath = toAbsolute(conf);
    if (mkdir) {
      mkdirp.sync(dirname(configFilePath));
    }
    const { serializedConfig } = writeConfigFile(configFilePath, json);
    return serializedConfig;
  },
});
