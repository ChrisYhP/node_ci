import { FETCH_USER, LOGIN } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
}
