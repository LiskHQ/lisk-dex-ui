export const swapExactInCommandSchema = {
  '$id': '/dex/swapExactInCommandSchema',
  'type': 'object',
  'required': [
    'tokenIdIn',
    'amountTokenIn',
    'tokenIdOut',
    'minAmountTokenOut',
    'swapRoute',
    'maxTimestampValid',
  ],
  'properties': {
    'tokenIdIn': {
      'dataType': 'bytes',
      'fieldNumber': 1,
    },
    'amountTokenIn': {
      'dataType': 'uint64',
      'fieldNumber': 2,
    },
    'tokenIdOut': {
      'dataType': 'bytes',
      'fieldNumber': 3,
    },
    'minAmountTokenOut': {
      'dataType': 'uint64',
      'fieldNumber': 4,
    },
    'swapRoute': {
      'type': 'array',
      'fieldNumber': 5,
      'items': {
        'dataType': 'bytes',
      },
    },
    'maxTimestampValid': {
      'dataType': 'uint64',
      'fieldNumber': 6,
    },
  },
};

export const swapExactOutCommandSchema = {
  $id: '/dex/swapExactOutCommandSchema',
  type: 'object',
  required: [
    'tokenIdIn',
    'maxAmountTokenIn',
    'tokenIdOut',
    'amountTokenOut',
    'swapRoute',
    'maxTimestampValid',
  ],
  properties: {
    tokenIdIn: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    maxAmountTokenIn: {
      dataType: 'uint64',
      fieldNumber: 2,
    },
    tokenIdOut: {
      dataType: 'bytes',
      fieldNumber: 3,
    },
    amountTokenOut: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    swapRoute: {
      type: 'array',
      fieldNumber: 5,
      items: {
        dataType: 'bytes',
      },
    },
    maxTimestampValid: {
      dataType: 'uint64',
      fieldNumber: 6,
    },
  },
};

export const swapWithPriceLimitCommandSchema = {
  $id: '/dex/swapWithPriceLimitCommandSchema',
  type: 'object',
  required: [
    'tokenIdIn',
    'maxAmountTokenIn',
    'tokenIdOut',
    'minAmountTokenOut',
    'poolId',
    'maxTimestampValid',
    'sqrtLimitPrice',
  ],
  properties: {
    tokenIdIn: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    maxAmountTokenIn: {
      dataType: 'uint64',
      fieldNumber: 2,
    },
    tokenIdOut: {
      dataType: 'bytes',
      fieldNumber: 3,
    },
    minAmountTokenOut: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    poolId: {
      dataType: 'bytes',
      fieldNumber: 5,
    },
    maxTimestampValid: {
      dataType: 'uint64',
      fieldNumber: 6,
    },
    sqrtLimitPrice: {
      dataType: 'uint64',
      fieldNumber: 7,
    },
  },
};
