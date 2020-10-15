import {
  LOGIN,
  LOGOUT,
  RETRIEVE_TOKEN,
  IS_NOT_FIRST_TIME,
} from "../constants/LoginConstants";

export const loginUser = (userToken) => {
  return {
    type: LOGIN,
    userToken: userToken,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

export const retrieveToken = (userToken) => {
  return { type: RETRIEVE_TOKEN, userToken: userToken };
};

export const isNotFirstTimeAction = () => {
  console.log("dispatched");
  return { type: IS_NOT_FIRST_TIME };
};
