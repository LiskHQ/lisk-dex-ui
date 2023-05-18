import { TransactionType } from "consts";

export interface IExpense {
  title: string,
  amount: string,
}

export interface ITransaction {
  type: TransactionType,
}