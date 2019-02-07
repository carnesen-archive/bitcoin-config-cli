import { option } from '@carnesen/cli';
import { BITCOIN_CONFIG_OPTIONS } from '@carnesen/bitcoin-config';

export const unsetOptions: {
  [optionName: string]: ReturnType<typeof option>;
} = {};

Object.keys(BITCOIN_CONFIG_OPTIONS).forEach(optionName => {
  unsetOptions[optionName] = option({
    typeName: 'boolean',
    nullable: false,
  });
});
