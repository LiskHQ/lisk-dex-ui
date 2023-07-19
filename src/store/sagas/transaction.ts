import { apiSubmitTransaction } from 'apis';
import { call, put } from 'redux-saga/effects';
import { AppActions } from 'store';

interface IResponse {
  data: unknown,
  meta: unknown,
  linnks: unknown,
}

export function* submitTransactionSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiSubmitTransaction(action.payload)
    );

    if (result) {
      yield put(AppActions.transaction.submitTransactionSuccess(result));
    }
  } catch (error) {
    yield put(AppActions.transaction.submitTransactionFailure(error));
  }
}