import { option } from '@carnesen/cli';
import { BITCOIN_CONFIG_OPTIONS } from '@carnesen/bitcoin-config';

export const setOptions: {
  [optionName: string]: ReturnType<typeof option>;
} = {};
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
  setOptions[optionName] = option({
    typeName,
    allowedValues,
    description: bitcoinConfigOption.description,
    nullable: true,
  });
});
