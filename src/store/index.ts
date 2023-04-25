import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import { transactionActions, transactionReducer, proposalActions, proposalReducer } from './slices';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  transaction: transactionReducer,
  proposal: proposalReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false })
      .concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export const AppActions = {
  transaction: transactionActions,
  proposal: proposalActions,
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
