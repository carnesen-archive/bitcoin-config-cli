import { option, leaf } from '@carnesen/cli';
import { toAbsolute, readConfigFiles, serializeConfig } from '@carnesen/bitcoin-config';
import { universalOptions } from './universal-options';

export const read = leaf({
  commandName: 'read',
  description: 'Read a bitcoin server software configuration',
  options: {
    ...universalOptions,
    format: option({
      typeName: 'string',
      nullable: false,
      description: 'Format of the output',
      defaultValue: 'pretty',
      allowedValues: ['json', 'ini'],
    }),
  },
  action({ conf, format }) {
    const configFilePath = toAbsolute(conf);
    const config = readConfigFiles(configFilePath);
    switch (format) {
      case 'pretty':
        return config;
      case 'json':
        return JSON.stringify(config, null, 2);
      case 'ini':
        return serializeConfig(config);
      default:
        throw new Error(`Unexpected format "${format}"`);
    }
  },
});
