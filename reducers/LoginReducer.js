import {LOGIN, LOGOUT} from '../constants/LoginConstants'


export const loginInitialState = {
  loggedIn : false
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn : true
      };
    case LOGOUT : 
    return {
        ...state,
        loggedIn: false
    }
    default:
      return state;
  }
 
};
