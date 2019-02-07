import { option, leaf } from '@carnesen/cli';
import { toAbsolute, writeConfigFile } from '@carnesen/bitcoin-config';
import mkdirp = require('mkdirp');
import { dirname } from 'path';
import { universalOptions } from './universal-options';

export const write = leaf({
  commandName: 'write',
  description: 'Write a bitcoin server software configuration',
  options: {
    ...universalOptions,
    json: option({
      typeName: 'json',
      nullable: false,
      description: 'Configuration as a JSON string',
    }),
  },
  action({ conf, json }) {
    const configFilePath = toAbsolute(conf);
    mkdirp.sync(dirname(configFilePath));
    writeConfigFile(configFilePath, json);
  },
});
