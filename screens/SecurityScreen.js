import React from "react";
import { View, Text, Button } from "react-native";

const SecurityScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SecurityScreen</Text>
      <Button title="Passed security go to dashboard" onPress={() => {navigation.navigate('DashboardScreen')}}/>
    </View>
  );
};

export default SecurityScreen
