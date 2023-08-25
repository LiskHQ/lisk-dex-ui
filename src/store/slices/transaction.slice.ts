import { createSlice } from '@reduxjs/toolkit';
import { ITransaction } from 'models';

type StateType = {
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
  },
});

export const actions = transactionSlice.actions;
export const reducer = transactionSlice.reducer;
