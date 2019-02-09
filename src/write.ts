import { option, leaf } from '@carnesen/cli';
import { toAbsolute, writeConfigFile } from '@carnesen/bitcoin-config';
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
    writeConfigFile(configFilePath, json);
  },
});
