import { TransactionType } from 'consts';

export interface IExpense {
  title: string,
  amount: string,
}

export interface ITransaction {
  type: TransactionType,
}

export interface ITransaction {
  id: string,
  moduleCommand: string,
  nonce: string,
  fee: string,
  minFee: string,
  size: number,
  block: {
    id: string,
    height: number,
    timestamp: number,
    isFinal: boolean
  },
  sender: {
    address: string,
    publicKey: string,
    name: string
  },
  params: any,
  executionStatus: string,
  index: number,
  meta: any,
}