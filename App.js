import React, { useReducer, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { loginInitialState, loginReducer } from "./reducers/LoginReducer";
import { AuthContext } from "./context/context";
import { db } from "./model";
import {
  loginUser,
  logoutUser,
  retrieveToken,
  isNotFirstTimeAction,
} from "./actions/LoginActions";
import Toaster from "./Shared/Toaster";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import RootStackScreen from "./screens/RootStackScreen";
import DashboardStackScreen from "./screens/DashboardStackScreen";
import SplashIntro from "./screens/SplashIntro";
import Onboarding from "./components/Onboarding";

export default function App() {
  const [loginState, dispatch] = useReducer(loginReducer, loginInitialState);
  const [showToaster, setShowToaster] = useState(false);
  const { userToken, isNotFirstTime } = loginState;
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const authContext = {
    login: async (userName, password) => {
      for (let i = 0; i < db.length; i++) {
        if (userName === db[i].name && password === db[i].password) {
          dispatch(loginUser(db[i].userToken));
          setShowToaster(true);
          try {
            await AsyncStorage.setItem("userToken", db[i].userToken);
          } catch (e) {
            console.log(e);
          }
        }
      }
    },

    logout: async () => {
      dispatch(logoutUser());
      try {
        await AsyncStorage.removeItem("userToken");
      } catch (e) {
        console.log(e);
      }
    },
    dispatchIsNotFirstTime: () => {
      dispatch(isNotFirstTimeAction());
    },
  };

  const getandDispatchToken = async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (e) {
      console.log(e);
    }
    dispatch(retrieveToken(userToken));
    setShowSplashScreen(false);
  };

  const checkIsNotFirstTimeVisit = async () => {
    const isNotFirstTime = await AsyncStorage.getItem("isNotFirstTime");
    if (isNotFirstTime === "isNotFirstTime") {
      console.log(isNotFirstTime);
      dispatch(isNotFirstTimeAction());
    }
  };

  useEffect(() => {
    checkIsNotFirstTimeVisit();
    const verifyToken = setTimeout(() => getandDispatchToken(), 7000);
    // AsyncStorage.clear()
    return () => clearTimeout(verifyToken);
  }, []);

  if (showSplashScreen) {
    return <SplashIntro />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {!isNotFirstTime ? (
          <Onboarding />
        ) : userToken ? (
          <DashboardStackScreen />
        ) : (
          <RootStackScreen />
        )}
        {showToaster ? (
          <Toaster
            setShowToaster={setShowToaster}
            message="Logged in succefully"
            interval={2000}
          />
        ) : null}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#85a381",
  },
});
