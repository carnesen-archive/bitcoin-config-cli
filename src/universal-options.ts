import { option } from '@carnesen/cli';
import { DEFAULT_CONFIG_FILE_NAME } from '@carnesen/bitcoin-config';

export const universalOptions = {
  conf: option({
    typeName: 'string',
    description: 'Absolute or datadir-relative path of a config file',
    defaultValue: DEFAULT_CONFIG_FILE_NAME,
  }),
};
