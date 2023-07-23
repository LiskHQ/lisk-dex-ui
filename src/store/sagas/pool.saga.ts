import { apiGetPools } from 'apis';
import { call, put } from 'redux-saga/effects';
import { AppActions } from 'store';

interface IResponse {
  data: unknown,
  meta: unknown,
  links: unknown,
}

export function* getPoolsSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetPools(action.payload)
    );

    if (result) {
      yield put(AppActions.pool.getPoolsSuccess(result.data));
    }
  } catch (error) {
    yield put(AppActions.pool.getPoolsFailure(error));
  }
}