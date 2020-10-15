import React, { useState, useReducer, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/context";

const LoginScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <View style={styles.view}>
      {/* <Text>This is Login screen</Text> */}
      <View
        style={{
          height: "30%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          elevation: 5,
          borderRadius: 5,
        }}
      >
        <TextInput
          style={{
            marginVertical: 10,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            width: "80%",
            paddingHorizontal: 5,
          }}
          placeholder="Please enter Username "
          onChangeText={(userNameValue) => {
            setUserName(userNameValue);
          }}
        />
        <TextInput
          style={{
            marginVertical: 10,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            width: "80%",
            paddingHorizontal: 5,
          }}
          secureTextEntry={true}
          placeholder="Please enter Password "
          onChangeText={(passwordValue) => {
            setPassword(passwordValue);
          }}
        />
        <View>
          <Button
            title="Login"
            onPress={() => {
              login(userName, password);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
