import { leaf, UsageError } from '@carnesen/cli';
import {
  BITCOIN_CONFIG_OPTIONS,
  readConfigFile,
  SectionedConfig,
  writeConfigFile,
  toAbsolute,
} from '@carnesen/bitcoin-config';
import { unsetOptions } from './unset-options';
import { universalOptions } from './universal-options';

export const unset = leaf({
  commandName: 'unset',
  options: { ...unsetOptions, ...universalOptions },
  action(namedArgs) {
    const absoluteConf = toAbsolute(namedArgs.conf);
    let nextConfig: SectionedConfig = {};
    try {
      nextConfig = readConfigFile(absoluteConf);
    } catch (ex) {
      if (ex.code !== 'ENOENT') {
        throw ex;
      }
    }
    let encounteredConfigArg = false;
    Object.entries(namedArgs).forEach(([optionName, shouldUnset]) => {
      const bitcoinConfigOption =
        BITCOIN_CONFIG_OPTIONS[optionName as keyof typeof BITCOIN_CONFIG_OPTIONS];
      if (!bitcoinConfigOption) {
        return;
      }
      encounteredConfigArg = true;
      if (shouldUnset) {
        delete (nextConfig as any)[optionName];
      }
    });

    if (!encounteredConfigArg) {
      throw new UsageError('Expected one or more configuration values to set');
    }

    writeConfigFile(absoluteConf, nextConfig);
  },
});
