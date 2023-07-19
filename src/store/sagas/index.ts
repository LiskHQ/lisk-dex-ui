import { all, takeLatest } from 'redux-saga/effects';
import { AppActions } from 'store';
import { getTransactionsSaga } from './wallet';
import {
  getAvailableTokensSaga,
  getPopularPairingsSaga,
  getPriceImpactSaga,
  getSlippageBoundsSaga,
  getToken2FiatConversionSaga,
  getToken2TokenConversionSaga
} from './token';
import { submitTransactionSaga } from './transaction';

function* rootSaga() {
  yield all([takeLatest(AppActions.wallet.getTransactions.type, getTransactionsSaga)]);

  yield all([takeLatest(AppActions.transaction.submitTransaction.type, submitTransactionSaga)]);

  yield all([takeLatest(AppActions.token.getAvailableTokens.type, getAvailableTokensSaga)]);
  yield all([takeLatest(AppActions.token.getPopularPairings.type, getPopularPairingsSaga)]);
  yield all([takeLatest(AppActions.token.getToken2TokenCoversion.type, getToken2TokenConversionSaga)]);
  yield all([takeLatest(AppActions.token.getToken2FiatConversion.type, getToken2FiatConversionSaga)]);
  yield all([takeLatest(AppActions.token.getPriceImpact.type, getPriceImpactSaga)]);
  yield all([takeLatest(AppActions.token.getSlippageBounds.type, getSlippageBoundsSaga)]);
}

export default rootSaga;