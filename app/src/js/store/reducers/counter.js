const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export function increment() {
  return {
    type: INCREMENT,
  };
}

export function decrement() {
  return {
    type: DECREMENT,
  };
}

const initialState = {
  count: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case `${INCREMENT}`:
      return {
        count: state.count + 1,
      };

    case `${DECREMENT}`:
      return {
        count: state.count - 1,
      };

    default:
      return state;
  }
}
