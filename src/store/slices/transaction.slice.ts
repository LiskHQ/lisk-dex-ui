import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExpense } from "models";

type StateType = {
  openTransactionApproval: boolean,
  approvingTransaction: boolean,
  approvedTransaction: boolean,
  sendingTransaction: boolean,
  sentTransaction: boolean,
  expenses: IExpense[],
  error: any,
};

const initialState: StateType = {
  openTransactionApproval: false,
  approvingTransaction: false,
  approvedTransaction: false,

  sendingTransaction: false,
  sentTransaction: false,

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
    setOpenTransactionApproval(state: any, action: PayloadAction<any>) {
      state.openTransactionApproval = action.payload;
    },
    approveTransaction(state: any, action: PayloadAction<any>) {
      state.approvingTransaction = true;
      state.approvedTransaction = false;
    },
    approveTransactionSuccess(state: any, action: PayloadAction<any>) {
      state.approvingTransaction = false;
      state.approvedTransaction = true;
      state.openTransactionApproval = false;
    },
    approveTransactionFailure(state: any, action: PayloadAction<any>) {
      state.approvingTransaction = false;
      state.approvedTransaction = false;
      state.error = action.payload;
    },
    resetApproveTransactionState(state: any) {
      state.approvingTransaction = false;
      state.approvedTransaction = false;
    },

    sendTransaction(state: any) {
      state.sendingTransaction = true;
      state.sentTransaction = false;
    },
    sendTransactionSuccess(state: any) {
      state.sendingTransaction = false;
      state.sentTransaction = true;
    },
    sendTransactionFailure(state, action: PayloadAction<any>) {
      state.sendingTransaction = false;
      state.sentTransaction = false;
      state.error = action.payload;
    },
    resetSendTransactionState(state: any) {
      state.sendingTransaction = false;
      state.sentTransaction = false;
    },

    //trasnaction summary
    setExpenses(state: any, action: PayloadAction<any>) {
      state.expenses = [...action.payload];
    }
  },
});

export const actions = transactionSlice.actions;
export const reducer = transactionSlice.reducer;

