import { option } from '@carnesen/cli';
import { DEFAULT_CONFIG_FILE_NAME } from '@carnesen/bitcoin-config';

export const universalOptions = {
  conf: option({
    typeName: 'string',
    nullable: false,
    description: `Absolute or datadir-relative path of a configuration file`,
    defaultValue: DEFAULT_CONFIG_FILE_NAME,
  }),
};
