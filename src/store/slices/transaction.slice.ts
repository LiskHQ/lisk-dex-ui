import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionType } from 'consts';
import { IExpense, ITransaction } from 'models';

type StateType = {
  openTransactionApproval: boolean,
  approvingTransaction: boolean,
  approvedTransaction: boolean,
  sendingTransaction: boolean,
  sentTransaction: boolean,
  confirmedTransaction: boolean,
  closeTransactionModal: boolean,
  expenses: IExpense[],
  transaction: any,

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
  openTransactionApproval: false,
  approvingTransaction: false,
  approvedTransaction: false,
  sendingTransaction: false,
  sentTransaction: false,
  confirmedTransaction: false,
  closeTransactionModal: false,
  transaction: {
    type: TransactionType.SWAP,
  },

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
    //approve a transaction modal
    setOpenTransactionApproval(state, action: PayloadAction<any>) {
      state.openTransactionApproval = action.payload;
    },
    approveTransaction(state) {
      state.approvingTransaction = true;
      state.approvedTransaction = false;
    },
    approveTransactionSuccess(state) {
      state.approvingTransaction = false;
      state.approvedTransaction = true;
      state.openTransactionApproval = false;
    },
    approveTransactionFailure(state, action: PayloadAction<any>) {
      state.approvingTransaction = false;
      state.approvedTransaction = false;
      state.error = action.payload;
    },
    resetApproveTransactionState(state) {
      state.approvingTransaction = false;
      state.approvedTransaction = false;
    },

    //send a transaction to wallet
    sendTransaction(state, action: PayloadAction<any>) {
      state.sendingTransaction = true;
      state.sentTransaction = false;
      state.closeTransactionModal = false;
      state.confirmedTransaction = false;
      state.transaction = action.payload;

      state.expenses = [
        {
          title: 'Transaction fee',
          amount: '0.87 LSK (~$0.66)',
        }
      ];

      if (state.transaction.type === TransactionType.INCREASE_LIQUIDITY || state.transaction.type === TransactionType.SUPPLY_LIQUIDITY) {
        state.expenses.push({
          title: 'Add Liquidity',
          amount: '4500 LSK & 5.6212 ETH(~$8752.45)',
        });
      }
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
      state.confirmedTransaction = false;
    },

    setCloseTransactionModal(state) {
      state.closeTransactionModal = true;
    },

    confirmTransactionSuccess(state) {
      state.sendingTransaction = false;
      state.sentTransaction = false;
      state.confirmedTransaction = true;
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
