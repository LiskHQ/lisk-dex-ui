import { createSlice } from '@reduxjs/toolkit';

type StateType = {
  gettingAvailableTokens: boolean,
  gotAvailableTokens: boolean,
  error: any,
};

const initialState: StateType = {
  gettingAvailableTokens: false,
  gotAvailableTokens: false,
  error: { message: '' },
};

const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {
    /**
     * token
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAvailableTokens(state, action) {
      state.gettingAvailableTokens = true;
      state.gotAvailableTokens = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAvailableTokensSuccess(state, action) {
      state.gettingAvailableTokens = false;
      state.gotAvailableTokens = true;
    },
    getAvailableTokensFailure(state, action) {
      state.gettingAvailableTokens = false;
      state.gotAvailableTokens = false;
      state.error = action.payload;
    }
  },
});

export const actions = tokenSlice.actions;
export const reducer = tokenSlice.reducer;

