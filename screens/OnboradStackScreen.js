import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Onboarding from '../components/Onboarding'

const OnboardStack = createStackNavigator();

const OnboardStackScreen = ({ navigation }) => (
  <OnboardStack.Navigator headerMode="none">
    <OnboardStack.Screen name="DashboardScreen" component={Onboarding} />
  </OnboardStack.Navigator>
);

export default OnboardStackScreen;
