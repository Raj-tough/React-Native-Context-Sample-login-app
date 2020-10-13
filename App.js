import React, { useReducer, useState } from "react";
import { View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { loginInitialState, loginReducer } from "./reducers/LoginReducer";
import { AuthContext } from "./context/context";
import {db} from './model'
import {loginUser, logoutUser} from './actions/LoginActions'
import Toaster from './Shared/Toaster'

export default function App() {
  const [loginState, dispatch] = useReducer(loginReducer, loginInitialState);
  const [showToaster, setShowToaster] = useState(false)
  const { loggedIn } = loginState;


  const authContext = {
    login: (userName, password) => {
      for (let i = 0; i < db.length; i++) {
        if (userName === db[i].name && password === db[i].password) {
          dispatch(loginUser());
          setShowToaster(true)
          
        }
      }
    },
    logout : () => {
      dispatch(logoutUser())
      setShowToaster(true)
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      <View
        style={{
          flex: 1,
          marginTop: 30,
        }}
      >
        {loggedIn ? <DashboardScreen /> : <LoginScreen />}
        {showToaster? <Toaster setShowToaster={setShowToaster} message='Logged in succefully' interval={2000}/> : null}
        
      </View>
    </AuthContext.Provider>
  );
}
