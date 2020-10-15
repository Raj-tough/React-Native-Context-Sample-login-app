import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DashboardScreen from "./DashboardScreen";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="DashboardScreen" component={DashboardScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
