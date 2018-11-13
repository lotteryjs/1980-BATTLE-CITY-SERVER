// import { routerMiddleware, LOCATION_CHANGE } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import createSgaMiddleware from 'redux-saga';
import reducer from '../reducers/index';
import rootSaga from '../sagas/index';
import history from '../utils/history';

const hook = (store: any) => (next: any) => (action: any) => {
  // tslint:disable-next-line:no-console
  // console.log(action);
  return next(action);
};

// const handleLocationChange = (store, location, action?) => {
//   store.dispatch({
//     type: LOCATION_CHANGE,
//     payload: {
//       location,
//       action,
//     },
//   });
// };

export function newStore() {
  const sagaMiddleware = createSgaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  // 这里主要是做 ConnectedRouter.js 的作用
  // handleLocationChange(store, history.location);
  sagaMiddleware.run(rootSaga);
  return store;
}