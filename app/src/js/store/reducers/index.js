import { combineReducers } from 'redux';

import counter from 'store/reducers/counter';

export default function makeRootReducer(asyncReducers) {
  return combineReducers({
    ...asyncReducers,
    counter,
  });
}

/*
 * USAGE:
 * import reducer_name from 'reducers/reducer_name';
 * injectReducer(store, { key: 'reducer_name', reducer: reducer_name });
 *
 * Can be used in case of Auth reducers if needs reducer to be chunked along with Auth components.
 * */
export function injectReducer(store, { key, reducer }) {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
}
