import { apiGetAccountTokens, apiGetAvailableTokens, apiGetPopularPairings, apiGetPriceImpact, apiGetSlippageBounds, apiGetToken2FiatConversion, apiGetToken2TokenConversion } from 'apis';
import { call, put } from 'redux-saga/effects';
import { AppActions } from 'store';

interface IResponse {
  data: unknown,
  meta: unknown,
  links: unknown,
}

export function* getAvailableTokensSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetAvailableTokens()
    );

    if (result) {
      yield put(AppActions.token.getAvailableTokensSuccess(result.data));
    }
  } catch (error) {
    yield put(AppActions.token.getAvailableTokensFailure(error));
  }
}

export function* getAccountTokensSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetAccountTokens(action.payload)
    );

    if (result) {
      yield put(AppActions.token.getAccountTokensSuccess(result.data));
    }
  } catch (error) {
    yield put(AppActions.token.getAccountTokensSuccess(error));
  }
}

export function* getToken2TokenConversionSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetToken2TokenConversion(action.payload)
    );

    if (result) {
      const { credibleDirectPriceToken2ToToken1 } = result.data as any;
      yield put(AppActions.token.getToken2TokenCoversionSuccess({
        ...action.payload,
        credibleDirectPriceToken2ToToken1,
      }));
    }
  } catch (error) {
    yield put(AppActions.token.getToken2TokenCoversionFailure(error));
  }
}

export function* getToken2FiatConversionSaga(action: any) {
  const { tokenSymbol } = action.payload;

  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetToken2FiatConversion(action.payload)
    );

    if (result) {
      const { convertedPrice, convertedTarget } = result.data as any;
      yield put(AppActions.token.getToken2FiatConversionSuccess({
        tokenSymbol,
        convertedTarget,
        convertedPrice,
      }));
    }
  } catch (error) {
    yield put(AppActions.token.getToken2FiatConversionFailure(error));
  }
}

export function* getPopularPairingsSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetPopularPairings(action.payload)
    );

    if (result) {
      yield put(AppActions.token.getPopularPairingsSuccess(result));
    }
  } catch (error) {
    yield put(AppActions.token.getPopularPairingsFailure(error));
  }
}

export function* getPriceImpactSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetPriceImpact(action.payload)
    );

    if (result) {
      yield put(AppActions.token.getPriceImpactSuccess(result));
    }
  } catch (error) {
    yield put(AppActions.token.getPriceImpactFailure(error));
  }
}

export function* getSlippageBoundsSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetSlippageBounds(action.payload)
    );

    if (result) {
      yield put(AppActions.token.getSlippageBoundsSuccess(result));
    }
  } catch (error) {
    yield put(AppActions.token.getSlippageBoundsFailure(error));
  }
}
