import { option, leaf, UsageError } from '@carnesen/cli';
import {
  BITCOIN_CONFIG_OPTIONS,
  toAbsolute,
  readConfigFile,
  SectionedConfig,
  writeConfigFile,
  serializeConfig,
  parseConfig,
} from '@carnesen/bitcoin-config';
import { universalOptions } from './universal-options';
import { readFileSync, existsSync } from 'fs';
import { dirname } from 'path';

export const set = leaf({
  commandName: 'set',
  description: 'Set a configuration value',
  options: {
    ...universalOptions,
    key: option({
      typeName: 'string',
      description: 'Config option name',
      allowedValues: Object.keys(BITCOIN_CONFIG_OPTIONS),
    }),
    values: option({
      typeName: 'string[]',
      description: 'One or more values to set',
    }),
  },
  action({ conf, key, values }) {
    const configFilePath = toAbsolute(conf);
    let config: SectionedConfig = {};
    try {
      config = readConfigFile(configFilePath);
    } catch (ex) {
      if (ex.code === 'ENOENT') {
        const configFileDir = dirname(configFilePath);
        if (!existsSync(configFileDir)) {
          throw new UsageError(`Directory "${configFileDir}" does not exist`);
        }
      }
    }
    const delta = parseConfig(serializeConfig({ [key]: values }));
    writeConfigFile(configFilePath, { ...config, ...delta });
  },
});
