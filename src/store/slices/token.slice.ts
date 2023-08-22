import { createSlice } from '@reduxjs/toolkit';
import { ConversionRates, IToken } from 'models';

type StateType = {
  gettingAvailableTokens: boolean,
  gotAvailableTokens: boolean,
  availableTokens: IToken[],

  gettingToken2TokenConversion: boolean,
  gotToken2TokenConversion: boolean,

  gettingToken2FiatConversion: boolean,
  gotToken2FiatConversion: boolean,

  conversionRates: ConversionRates,

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

  gettingToken2FiatConversion: false,
  gotToken2FiatConversion: false,

  conversionRates: {
    LSK: {
      USD: 0.8863,
      DEX: 0.1,
    },
    DEX: {
      USD: 0.0886
    }
  },

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
    getAvailableTokens(state) {
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
      const { tokenSymbol, conversionTokenSymbol, credibleDirectPriceToken2ToToken1 } = action.payload;
      state.conversionRates[tokenSymbol][conversionTokenSymbol] = credibleDirectPriceToken2ToToken1 || 0;
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

      const { tokenSymbol, convertedPrice, convertedTarget } = action.payload;
      state.conversionRates[tokenSymbol][convertedTarget] = convertedPrice || 0;
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

