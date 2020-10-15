import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/context";


const DashboardScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View style ={styles.view}>
      <Text>Dashboard Screen</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button title="logout" onPress={() => logout()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default DashboardScreen; 
