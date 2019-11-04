import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ].concat(createLogger());

  const enhancers = [
    applyMiddleware(...middlewares),
  ].concat(devtools());

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  );

  // Create hook for async sagas
  store.runSaga = sagaMiddleware.run(rootSaga);

  // sagaMiddleware.run(formActionSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}