import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExpense } from "models";

type StateType = {
  openTransactionApproval: boolean,
  approvingTransaction: boolean,
  approvedTransaction: boolean,
  sendingTransaction: boolean,
  sentTransaction: boolean,
  confirmedTransaction: boolean,
  closeTransactionModal: boolean,
  expenses: IExpense[],
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

  expenses: [],
  error: { message: '' },
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {
    /**
     * transaction
     */
    //approve a transaction modal
    setOpenTransactionApproval(state, action: PayloadAction<any>) {
      state.openTransactionApproval = action.payload;
    },
    approveTransaction(state, action: PayloadAction<any>) {
      state.approvingTransaction = true;
      state.approvedTransaction = false;
    },
    approveTransactionSuccess(state, action: PayloadAction<any>) {
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

    sendTransaction(state) {
      state.sendingTransaction = true;
      state.sentTransaction = false;
      state.closeTransactionModal = false;
      state.confirmedTransaction = false;
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

    //trasnaction summary
    setExpenses(state, action: PayloadAction<any>) {
      state.expenses = [...action.payload];
    }
  },
});

export const actions = transactionSlice.actions;
export const reducer = transactionSlice.reducer;
