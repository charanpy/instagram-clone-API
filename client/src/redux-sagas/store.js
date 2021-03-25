import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';

import rootSaga from './root-saga';

const sagasMiddleware = createSagaMiddleware();

const middlewares = [logger, sagasMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagasMiddleware.run(rootSaga);

export default store;
