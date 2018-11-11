import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import createSgaMiddleware from 'redux-saga';
import reducer from '../reducers/index';
import rootSaga from '../sagas/index';
import history from '../utils/history';
const sagaMiddleware = createSgaMiddleware();

const hook = (store: any) => (next: any) => (action: any) => {
  // tslint:disable-next-line:no-console
  console.log(action);
  return next(action);
};

export default createStore(reducer, applyMiddleware(routerMiddleware(history), sagaMiddleware, hook));

sagaMiddleware.run(rootSaga);
