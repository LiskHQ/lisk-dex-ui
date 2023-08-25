import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionType } from 'consts';
import { IExpense, ITransaction } from 'models';

type StateType = {
  sendingTransaction: boolean,
  sentTransaction: boolean,
  expenses: IExpense[],

  submitingTransaction: boolean,
  submitedTransaction: boolean,

  gettingTransactions: boolean,
  gotTransactions: boolean,
  transactions: ITransaction[],
  count: number,
  offset: number,
  total: number,

  error: any,
};

const initialState: StateType = {
  sendingTransaction: false,
  sentTransaction: false,

  expenses: [],

  //submit signed transaction
  submitingTransaction: false,
  submitedTransaction: false,

  //get transactions
  gettingTransactions: false,
  gotTransactions: false,

  transactions: [],
  count: 10,
  offset: 0,
  total: 0,

  error: { message: '' },
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialState,
  reducers: {
    /**
     * transaction
     */
    //send a transaction to wallet
    sendTransaction(state, action: PayloadAction<any>) {
      state.sendingTransaction = true;
      state.sentTransaction = false;

      state.expenses = [
        {
          title: 'Transaction fee',
          amount: '0.87 LSK (~$0.66)',
        }
      ];
    },
    sendTransactionSuccess(state) {
      state.sendingTransaction = false;
      state.sentTransaction = true;
    },
    sendTransactionFailure(state, action: PayloadAction<any>) {
      state.sendingTransaction = false;
      state.sentTransaction = false;
      state.error = action.payload;
    },
    resetSendTransactionState(state) {
      state.sendingTransaction = false;
      state.sentTransaction = false;
    },

    confirmTransactionSuccess(state) {
      state.sendingTransaction = false;
      state.sentTransaction = false;
    },

    // submit signed transaction
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitTransaction(state, action) {
      state.submitingTransaction = true;
      state.submitedTransaction = false;
    },
    submitTransactionSuccess(state, action) {
      state.submitingTransaction = false;
      state.submitedTransaction = true;
      action.payload;
    },
    submitTransactionFailure(state, action) {
      state.submitingTransaction = false;
      state.submitedTransaction = false;
      state.error = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTransactions(state, action) {
      state.gettingTransactions = true;
      state.gotTransactions = false;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTransactionsSuccess(state, action) {
      state.gettingTransactions = false;
      state.gotTransactions = true;

      const { data, meta } = action.payload;
      state.transactions = [...data];
      state.count = meta.count;
      state.offset = meta.offset;
      state.total = meta.total;
    },

    getTransactionsFailure(state, action) {
      state.gettingTransactions = false;
      state.gotTransactions = false;
      state.error = action.payload;
    },

    resetTransactionStates(state) {
      state.submitedTransaction = false;
      state.submitingTransaction = false;
      state.error = { message: '' };
    },

    //trasnaction summary
    setExpenses(state, action: PayloadAction<any>) {
      state.expenses = [...action.payload];
    }
  },
});

export const actions = transactionSlice.actions;
export const reducer = transactionSlice.reducer;
