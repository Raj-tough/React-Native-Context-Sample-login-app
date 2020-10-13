import { LOGIN, LOGOUT } from "../constants/LoginConstants";

export const loginUser = () => {
  return {
    type: LOGIN,
  };
};

export const logoutUser = () => {
    return {
      type: LOGOUT,
    };
  };
