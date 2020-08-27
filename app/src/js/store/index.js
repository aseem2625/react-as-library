import { createStore, applyMiddleware } from 'redux';
import apiAsyncMiddleware from 'store/middlewares/apiAsync';
import makeRootReducer from 'store/reducers';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/*
 * Create store
 *
 * */
export default (initialDataAtServer = {}) => {
  let store = null;
  // Create store
  // with initial state if it exists
  store = createStore(
    makeRootReducer(),
    initialDataAtServer,
    applyMiddleware(apiAsyncMiddleware)
  );

  store.asyncReducers = {};

  // Return store only
  // But as an object for consistency
  return {
    store,
  };
};
