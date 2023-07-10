import { createSlice } from '@reduxjs/toolkit';

type StateType = {
  gettingAvailableTokens: boolean,
  gotAvailableTokens: boolean,
  availableTokens: string[],

  gettingToken2TokenConversion: boolean,
  gotToken2TokenConversion: boolean,
  token2TokenConversion: number,

  gettingToken2FiatConversion: boolean,
  gotToken2FiatConversion: boolean,
  token2FiatConversion: number,

  gettingPopularPairings: boolean,
  gotPopularPairings: boolean,
  popularPairings: string[],

  error: any,
};

const initialState: StateType = {
  gettingAvailableTokens: false,
  gotAvailableTokens: false,
  availableTokens: [],

  gettingToken2TokenConversion: false,
  gotToken2TokenConversion: false,
  token2TokenConversion: 0,

  gettingToken2FiatConversion: false,
  gotToken2FiatConversion: false,
  token2FiatConversion: 0,

  gettingPopularPairings: false,
  gotPopularPairings: false,
  popularPairings: [],

  error: { message: '' },
};

const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {
    /**
     * available tokens
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
      state.availableTokens = [...action.payload];
    },
    getAvailableTokensFailure(state, action) {
      state.gettingAvailableTokens = false;
      state.gotAvailableTokens = false;
      state.error = action.payload;
    },

    /**
     * token to token conversion
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getToken2TokenCoversion(state, action) {
      state.gettingToken2TokenConversion = true;
      state.gotToken2TokenConversion = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getToken2TokenCoversionSuccess(state, action) {
      state.gettingToken2TokenConversion = false;
      state.gotToken2TokenConversion = true;
      state.token2TokenConversion = action.payload.data.convertedPrice;
    },
    getToken2TokenCoversionFailure(state, action) {
      state.gettingToken2TokenConversion = false;
      state.gotToken2TokenConversion = false;
      state.error = action.payload;
    },

    /**
     * token to fiat conversion
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getToken2FiatConversion(state, action) {
      state.gettingToken2FiatConversion = true;
      state.gotToken2FiatConversion = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getToken2FiatConversionSuccess(state, action) {
      state.gettingToken2FiatConversion = false;
      state.gotToken2FiatConversion = true;
      state.token2FiatConversion = action.payload.data.convertedPrice;
    },
    getToken2FiatConversionFailure(state, action) {
      state.gettingToken2FiatConversion = false;
      state.gotToken2FiatConversion = false;
      state.error = action.payload;
    },

    /**
     * get popular pairings
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPopularPairings(state, action) {
      state.gettingPopularPairings = true;
      state.gotPopularPairings = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPopularPairingsSuccess(state, action) {
      state.gettingPopularPairings = false;
      state.gotPopularPairings = true;
      state.popularPairings = action.payload;
    },
    getPopularPairingsFailure(state, action) {
      state.gettingPopularPairings = false;
      state.gotPopularPairings = false;
      state.error = action.payload;
    },

    /**
     * get price impact
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPriceImpact(state, action) {
      state.gettingPopularPairings = true;
      state.gotPopularPairings = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPriceImpactSuccess(state, action) {
      state.gettingPopularPairings = false;
      state.gotPopularPairings = true;
    },
    getPriceImpactFailure(state, action) {
      state.gettingPopularPairings = false;
      state.gotPopularPairings = false;
      state.error = action.payload;
    },

    /**
     * get slippage bounds
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getSlippageBounds(state, action) {
      state.gettingPopularPairings = true;
      state.gotPopularPairings = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getSlippageBoundsSuccess(state, action) {
      state.gettingPopularPairings = false;
      state.gotPopularPairings = true;
    },
    getSlippageBoundsFailure(state, action) {
      state.gettingPopularPairings = false;
      state.gotPopularPairings = false;
      state.error = action.payload;
    }
  },
});

export const actions = tokenSlice.actions;
export const reducer = tokenSlice.reducer;

