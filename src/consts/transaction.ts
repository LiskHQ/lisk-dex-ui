export enum TransactionType {
  SWAP = 'SWAP',
  SUPPLY_LIQUIDITY = 'SUPPLY_LIQUIDITY',
  INCREASE_LIQUIDITY = 'INCREASE_LIQUIDITY',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
}

export enum TransactionModule {
  dex = 'dex',
}

export enum TransactionCommand {
  swapExactIn = 'swapExactIn',

}

export enum TransactionStatus {
  PENDING,
  SUCCESS,
  FAILURE,
}