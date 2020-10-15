import {
  LOGIN,
  LOGOUT,
  RETRIEVE_TOKEN,
  IS_NOT_FIRST_TIME,
} from "../constants/LoginConstants";

export const loginInitialState = {
  loggedIn: false,
  userToken: null,
  isNotFirstTime: false,
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        userToken: action.userToken,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userToken: null,
      };
    case RETRIEVE_TOKEN:
      return {
        ...state,
        userToken: action.userToken,
      };
    case IS_NOT_FIRST_TIME:
      return { ...state, isNotFirstTime: true };

    default:
      return state;
  }
};
