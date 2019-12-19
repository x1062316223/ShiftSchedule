import {combineReducers} from 'redux';
import {
  LOGIN,
  SIGNUP,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_FIRSTNAME,
  UPDATE_LASTNAME,
  LOGOUT,
} from '../actions/user';

const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case LOGOUT:
      return action.payload;
    case UPDATE_EMAIL:
      return {...state, email: action.payload};
    case UPDATE_PASSWORD:
      return {...state, password: action.payload};
    case UPDATE_FIRSTNAME:
      return {...state, firstname: action.payload};
    case UPDATE_LASTNAME:
      return {...state, lastname: action.payload};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
