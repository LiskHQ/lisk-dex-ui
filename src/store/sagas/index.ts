import { all, take, takeLatest } from 'redux-saga/effects';
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
  getPoolsSaga
} from './pool.saga';
import {
  getProposalsSaga,
  getCertainProposalSaga
} from './proposal.saga';
import {
  getVotesSaga
} from './vote.saga';

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

  yield all([takeLatest(AppActions.proposal.getProposals.type, getProposalsSaga)]);
  yield all([takeLatest(AppActions.proposal.getCertainProposal.type, getCertainProposalSaga)]);

  yield all([takeLatest(AppActions.proposal.getVotes.type, getVotesSaga)]);
}

export default rootSaga;