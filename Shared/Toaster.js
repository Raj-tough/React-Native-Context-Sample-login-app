import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";

const Toaster = (props) => {
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const Interval = setInterval(() => {
      props.setShowToaster(false);
    }, props.interval);
    return () => clearInterval(Interval);
  }, []);
  return (
    <View
      style={{
        marginBottom: 30,
        position: "absolute",
        bottom: 0,
        left: 25,
        width: (90 / 100) * width,
        height: (5 / 100) * height,
        borderRadius: 15,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>{props.message}</Text>
    </View>
  );
};

export default Toaster;
