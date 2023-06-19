import { apiGetTransactions } from "apis";
import { call, put } from "redux-saga/effects";
import { AppActions } from "store";

interface IResponse {
  data: unknown,
  meta: unknown,
  linnks: unknown,
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