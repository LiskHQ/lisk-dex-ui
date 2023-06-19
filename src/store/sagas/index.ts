import { all, takeLatest } from "redux-saga/effects";
import { AppActions } from "store";
import { getTransactionsSaga } from "./wallet";

function* rootSaga() {
  yield all([takeLatest(AppActions.wallet.getTransactions.type, getTransactionsSaga)]);
}

export default rootSaga;