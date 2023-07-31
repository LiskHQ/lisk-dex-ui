import { all, takeLatest } from 'redux-saga/effects';
import { AppActions } from 'store';
import {
  getAvailableTokensSaga,
  getPopularPairingsSaga,
  getPriceImpactSaga,
  getSlippageBoundsSaga,
  getToken2FiatConversionSaga,
  getToken2TokenConversionSaga
} from './token.saga';
import {
  getTransactionsSaga,
  submitTransactionSaga
} from './transaction.saga';
import {
  getPoolsSaga,
  getStasticsSaga,
} from './pool.saga';

function* rootSaga() {
  yield all([takeLatest(AppActions.wallet.getTransactions.type, getTransactionsSaga)]);
  yield all([takeLatest(AppActions.transaction.submitTransaction.type, submitTransactionSaga)]);

  yield all([takeLatest(AppActions.token.getAvailableTokens.type, getAvailableTokensSaga)]);
  yield all([takeLatest(AppActions.token.getPopularPairings.type, getPopularPairingsSaga)]);
  yield all([takeLatest(AppActions.token.getToken2TokenCoversion.type, getToken2TokenConversionSaga)]);
  yield all([takeLatest(AppActions.token.getToken2FiatConversion.type, getToken2FiatConversionSaga)]);
  yield all([takeLatest(AppActions.token.getPriceImpact.type, getPriceImpactSaga)]);
  yield all([takeLatest(AppActions.token.getSlippageBounds.type, getSlippageBoundsSaga)]);

  yield all([takeLatest(AppActions.pool.getPools.type, getPoolsSaga)]);
  yield all([takeLatest(AppActions.pool.getStastics.type, getStasticsSaga)]);
}

export default rootSaga;