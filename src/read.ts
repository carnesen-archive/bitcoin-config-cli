import { option, leaf } from '@carnesen/cli';
import { toAbsolute, readConfigFiles } from '@carnesen/bitcoin-config';
import { readFileSync } from 'fs';
import { universalOptions } from './universal-options';

export const read = leaf({
  commandName: 'read',
  description: 'Read the contents of a configuration file',
  options: {
    ...universalOptions,
    format: option({
      typeName: 'string',
      nullable: false,
      description: 'Format of the output',
      defaultValue: 'pretty',
      allowedValues: ['raw', 'json'],
    }),
  },
  action({ conf, format }) {
    const configFilePath = toAbsolute(conf);
    if (format === 'raw') {
      return readFileSync(configFilePath, { encoding: 'utf8' });
    }
    const config = readConfigFiles(configFilePath);
    if (format === 'pretty') {
      return config;
    }
    // format === 'json'
    return JSON.stringify(config, null, 2);
  },
});
