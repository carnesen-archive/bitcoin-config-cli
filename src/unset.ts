import { leaf, UsageError } from '@carnesen/cli';
import {
  BITCOIN_CONFIG_OPTIONS,
  toAbsolute,
  updateConfigFile,
} from '@carnesen/bitcoin-config';
import { unsetOptions } from './unset-options';
import { universalOptions } from './universal-options';

type Delta = { [K in keyof typeof BITCOIN_CONFIG_OPTIONS]?: null };

export const unset = leaf({
  commandName: 'unset',
  description: 'Unset bitcoin configuration values',
  options: { ...unsetOptions, ...universalOptions },
  action(namedArgs) {
    const filePath = toAbsolute(namedArgs.conf);
    const delta: Delta = {};
    for (const [argName, argValue] of Object.entries(namedArgs)) {
      const bitcoinOption =
        BITCOIN_CONFIG_OPTIONS[argName as keyof typeof BITCOIN_CONFIG_OPTIONS];
      if (!bitcoinOption) {
        continue;
      }
      if (argValue === true) {
        delta[argName as keyof typeof BITCOIN_CONFIG_OPTIONS] = null;
      }
    }

    if (Object.keys(delta).length === 0) {
      throw new UsageError('Expected one or more configuration values to unset');
    }

    updateConfigFile(filePath, delta);
  },
});
