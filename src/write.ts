import { option, leaf } from '@carnesen/cli';
import { universalOptions } from './universal-options';
import { toAbsolute, writeConfigFile } from '@carnesen/bitcoin-config';

export const write = leaf({
  commandName: 'write',
  options: {
    ...universalOptions,
    json: option({
      typeName: 'json',
      description: 'Bitcoin configuration as a JSON string',
    }),
  },
  action({ conf, json }) {
    const configFilePath = toAbsolute(conf);
    writeConfigFile(configFilePath, json);
  },
});
