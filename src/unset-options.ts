import { option } from '@carnesen/cli';
import { BITCOIN_CONFIG_OPTIONS } from '@carnesen/bitcoin-config';

const dummyOption = option({
  typeName: 'boolean',
  nullable: false,
});

type UnsetOptions = { [K in keyof typeof BITCOIN_CONFIG_OPTIONS]: typeof dummyOption };

const partialUnsetOptions: Partial<UnsetOptions> = {};

for (const optionName of Object.keys(BITCOIN_CONFIG_OPTIONS)) {
  partialUnsetOptions[optionName as keyof typeof BITCOIN_CONFIG_OPTIONS] = option({
    typeName: 'boolean',
    nullable: false,
  });
}

export const unsetOptions = partialUnsetOptions as UnsetOptions;
