import { leaf, option, UsageError } from '@carnesen/cli';
import {
  BITCOIN_CONFIG_OPTIONS,
  readConfigFile,
  SectionedConfig,
  writeConfigFile,
  toAbsolute,
} from '@carnesen/bitcoin-config';
import { universalOptions } from './universal-options';
import mkdirp = require('mkdirp');
import { dirname } from 'path';

const options: { [optionName: string]: ReturnType<typeof option> } = {};
Object.entries(BITCOIN_CONFIG_OPTIONS).forEach(([optionName, bitcoinConfigOption]) => {
  let typeName: Parameters<typeof option>[0]['typeName'];
  let allowedValues: Parameters<typeof option>[0]['allowedValues'] = undefined;
  switch (bitcoinConfigOption.typeName) {
    case 'boolean':
      typeName = 'string';
      allowedValues = ['0', '1'];
      break;
    case 'string':
    case 'number':
    case 'string[]':
      typeName = bitcoinConfigOption.typeName;
      break;
    default:
      throw new Error(`Unexpected typeName "${bitcoinConfigOption!.typeName}"`);
  }
  options[optionName] = option({
    typeName,
    allowedValues,
    description: bitcoinConfigOption.description,
    nullable: true,
  });
});

export const set = leaf({
  commandName: 'set',
  options: { ...options, ...universalOptions },
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
