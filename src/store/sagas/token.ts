import { apiGetAvailableTokens } from 'apis';
import { call, put } from 'redux-saga/effects';
import { AppActions } from 'store';

interface IResponse {
  data: unknown,
  meta: unknown,
  linnks: unknown,
}

export function* getAvailableTokensSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetAvailableTokens(action.payload)
    );

    if (result) {
      yield put(AppActions.token.getAvailableTokensSuccess(result));
    }
  } catch (error) {
    yield put(AppActions.token.getAvailableTokensFailure(error));
  }
}