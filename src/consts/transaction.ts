export enum TransactionType {
  SWAP = 'SWAP',
  SUPPLY_LIQUIDITY = 'SUPPLY_LIQUIDITY',
  INCREASE_LIQUIDITY = 'INCREASE_LIQUIDITY',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
}

export enum TransactionModule {
  dex = 'dex',
  dexGovernance = 'dexGovernance'
}

export const TransactionCommands = {
  swapExactIn: 'swapExactIn',
  createPool: 'createPool',
  createPosition: 'createPosition',
  addLiquidity: 'addLiquidity',
  createProposal: 'createProposal',
};

export enum TransactionStatus {
  PENDING,
  SUCCESS,
  FAILURE,
}