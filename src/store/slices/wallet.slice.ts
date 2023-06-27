import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccount } from 'models';

type StateType = {
  account: IAccount | null,
  gettingTransactions: boolean,
  gotTransactions: boolean,
  error: any,
};

const initialState: StateType = {
  account: null,
  gettingTransactions: false,
  gotTransactions: false,
  error: { message: '' },
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    /**
     * wallet
     */
    setAccount(state, action: PayloadAction<IAccount>) {
      state.account = action.payload;
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
    },

    getTransactionsFailure(state, action) {
      state.gettingTransactions = false;
      state.gotTransactions = false;
      state.error = action.payload;
    },

    resetWalletState(state) {
      state.account = null;
    }
  },
});

export const actions = walletSlice.actions;
export const reducer = walletSlice.reducer;
