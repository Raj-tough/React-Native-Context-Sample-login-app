import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/context";

const DashboardScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Text>Dashboard Screen</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button title="logout" onPress={() => logout()} />
      </View>
    </View>
  );
};

export default DashboardScreen;
