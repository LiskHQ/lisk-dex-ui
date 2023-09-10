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

export const createPoolSchema = {
  $id: '/dex/createPoolSchema',
  type: 'object',
  required: [
    'tokenID0',
    'tokenID1',
    'feeTier',
    'tickInitialPrice',
    'initialPosition',
    'maxTimestampValid',
  ],
  properties: {
    tokenID0: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    tokenID1: {
      dataType: 'bytes',
      fieldNumber: 2,
    },
    feeTier: {
      dataType: 'uint32',
      fieldNumber: 3,
    },
    tickInitialPrice: {
      dataType: 'sint32',
      fieldNumber: 4,
    },
    initialPosition: {
      type: 'object',
      fieldNumber: 5,
      required: ['tickLower', 'tickUpper', 'amount0Desired', 'amount1Desired'],
      properties: {
        tickLower: {
          dataType: 'sint32',
          fieldNumber: 1,
        },
        tickUpper: {
          dataType: 'sint32',
          fieldNumber: 2,
        },
        amount0Desired: {
          dataType: 'uint64',
          fieldNumber: 3,
        },
        amount1Desired: {
          dataType: 'uint64',
          fieldNumber: 4,
        },
      },
    },
    maxTimestampValid: {
      dataType: 'uint64',
      fieldNumber: 6,
    },
  },
};

export const createPositionSchema = {
  $id: '/dex/createPositionSchema',
  type: 'object',
  required: [
    'poolID',
    'tickLower',
    'tickUpper',
    'amount0Desired',
    'amount1Desired',
    'amount0Min',
    'amount1Min',
    'maxTimestampValid',
  ],
  properties: {
    poolID: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    tickLower: {
      dataType: 'sint32',
      fieldNumber: 2,
    },
    tickUpper: {
      dataType: 'sint32',
      fieldNumber: 3,
    },
    amount0Desired: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    amount1Desired: {
      dataType: 'uint64',
      fieldNumber: 5,
    },
    amount0Min: {
      dataType: 'uint64',
      fieldNumber: 6,
    },
    amount1Min: {
      dataType: 'uint64',
      fieldNumber: 7,
    },
    maxTimestampValid: {
      dataType: 'uint64',
      fieldNumber: 8,
    },
  },
};

export const addLiquiditySchema = {
  $id: '/dex/addLiquiditySchema',
  type: 'object',
  required: [
    'positionID',
    'amount0Desired',
    'amount1Desired',
    'amount0Min',
    'amount1Min',
    'maxTimestampValid',
  ],
  properties: {
    positionID: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    amount0Desired: {
      dataType: 'uint64',
      fieldNumber: 2,
    },
    amount1Desired: {
      dataType: 'uint64',
      fieldNumber: 3,
    },
    amount0Min: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    amount1Min: {
      dataType: 'uint64',
      fieldNumber: 5,
    },
    maxTimestampValid: {
      dataType: 'uint64',
      fieldNumber: 6,
    },
  },
};

export const removeLiquiditySchema = {
  $id: '/dex/removeLiquidity',
  type: 'object',
  required: ['positionID', 'liquidityToRemove', 'amount0Min', 'amount1Min', 'maxTimestampValid'],
  properties: {
    positionID: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    liquidityToRemove: {
      dataType: 'uint64',
      fieldNumber: 2,
    },
    amount0Min: {
      dataType: 'uint64',
      fieldNumber: 3,
    },
    amount1Min: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    maxTimestampValid: {
      dataType: 'uint64',
      fieldNumber: 5,
    },
  },
};

export const voteOnProposalParamsSchema = {
  $id: '/dexGovernance/voteOnProposalParamsSchema',
  type: 'object',
  required: ['proposalIndex', 'decision'],
  properties: {
    proposalIndex: {
      dataType: 'uint32',
      fieldNumber: 1,
    },
    decision: {
      dataType: 'uint32',
      fieldNumber: 2,
    },
  },
};