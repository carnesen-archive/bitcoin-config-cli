import { dirname } from 'path';

import { leaf, UsageError } from '@carnesen/cli';
import {
  BITCOIN_CONFIG_OPTIONS,
  readConfigFile,
  SectionedConfig,
  writeConfigFile,
  toAbsolute,
} from '@carnesen/bitcoin-config';
import mkdirp = require('mkdirp');

import { universalOptions } from './universal-options';
import { setOptions } from './set-options';

export const set = leaf({
  commandName: 'set',
  options: { ...setOptions, ...universalOptions },
  action(namedArgs) {
    const passedConfig: any = {};
    Object.entries(namedArgs).forEach(([optionName, optionValue]) => {
      if (optionValue === null) {
        return;
      }
      const bitcoinConfigOption =
        BITCOIN_CONFIG_OPTIONS[optionName as keyof typeof BITCOIN_CONFIG_OPTIONS];
      if (!bitcoinConfigOption) {
        return;
      }
      if (bitcoinConfigOption.typeName === 'boolean') {
        passedConfig[optionName] = optionValue === '1';
        return;
      }
      passedConfig[optionName] = optionValue;
    });

    if (Object.keys(passedConfig).length === 0) {
      throw new UsageError('Expected one or more configuration values to set');
    }

    const absoluteConf = toAbsolute(namedArgs.conf);
    let existingConfig: SectionedConfig = {};
    try {
      existingConfig = readConfigFile(absoluteConf);
    } catch (ex) {
      if (ex.code !== 'ENOENT') {
        throw ex;
      }
    }
    const nextConfig = { ...existingConfig, ...passedConfig };
    mkdirp.sync(dirname(absoluteConf));
    writeConfigFile(absoluteConf, nextConfig);
  },
});
