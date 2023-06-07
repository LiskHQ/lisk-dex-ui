import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StateType = {
  address: string,
  balance: number,
  error: any,
};

const initialState: StateType = {
  address: '',
  balance: 0,
  error: { message: '' },
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    /**
     * wallet
     */
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
    resetWalletState(state) {
      state.address = '';
      state.balance = 0;
    }
  },
});

export const actions = walletSlice.actions;
export const reducer = walletSlice.reducer;
