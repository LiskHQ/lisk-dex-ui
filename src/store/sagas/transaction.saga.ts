import { apiGetTransactions, apiSubmitTransaction } from 'apis';
import { call, put } from 'redux-saga/effects';
import { AppActions } from 'store';

interface IResponse {
  data: unknown,
  meta: unknown,
  links: unknown,
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
  } catch (error: any) {
    yield put(AppActions.transaction.submitTransactionFailure(error.response.data));
  }
}

export function* getTransactionsSaga(action: any) {
  try {
    const result: IResponse = yield call(
      async () =>
        await apiGetTransactions(action.payload)
    );

    if (result) {
      yield put(AppActions.wallet.getTransactionsSuccess(result));
    }
  } catch (error) {
    yield put(AppActions.wallet.getTransactionsFailure(error));
  }
}