import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  openTransactionApproval: boolean,
  approvingTransaction: boolean,
  approvedTransaction: boolean,
  error: any,
};

const initialState: StateType = {
  openTransactionApproval: false,
  approvingTransaction: false,
  approvedTransaction: false,
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
    }
  },
});

export const actions = transactionSlice.actions;
export const reducer = transactionSlice.reducer;

