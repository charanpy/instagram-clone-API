import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';

import rootSaga from './root-saga';

const sagasMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagasMiddleware))
);

sagasMiddleware.run(rootSaga);

export default store;
