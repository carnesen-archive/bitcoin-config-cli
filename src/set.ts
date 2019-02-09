import { leaf, UsageError } from '@carnesen/cli';
import {
  BITCOIN_CONFIG_OPTIONS,
  updateConfigFile,
  toAbsolute,
} from '@carnesen/bitcoin-config';

import { universalOptions } from './universal-options';
import { setOptions } from './set-options';

export const set = leaf({
  commandName: 'set',
  description: 'Set bitcoin configuration values',
  options: { ...setOptions, ...universalOptions },
  action(namedArgs) {
    const delta: any = {};
    Object.entries(namedArgs).forEach(([argName, argValue]) => {
      const bitcoinConfigOption =
        BITCOIN_CONFIG_OPTIONS[argName as keyof typeof BITCOIN_CONFIG_OPTIONS];
      if (!bitcoinConfigOption) {
        // Should mean the current argName is "conf"
        return;
      }
      if (argValue === null) {
        return;
      }
      if (bitcoinConfigOption.typeName === 'boolean') {
        delta[argName] = argValue === '1';
        return;
      }
      delta[argName] = argValue;
    });

    if (Object.keys(delta).length === 0) {
      throw new UsageError('Expected one or more configuration values to set');
    }

    const filePath = toAbsolute(namedArgs.conf);
    updateConfigFile(filePath, delta);
  },
});
