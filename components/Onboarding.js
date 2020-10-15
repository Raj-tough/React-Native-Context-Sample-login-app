import { Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/context";

import Onboarding from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-community/async-storage";
const imageURl =
  "https://ui8.s3.amazonaws.com/v5/assets/global/touch-icon-ipad-retina.png";

const Simple = ({ navigation }) => {
  const { dispatchIsNotFirstTime } = useContext(AuthContext);

  const setIsNotFirstTime = async () => {
    await AsyncStorage.setItem("isNotFirstTime", "isNotFirstTime");
    dispatchIsNotFirstTime();
  };

  return (
    <Onboarding
      onSkip={() => setIsNotFirstTime()}
      onDone={() => setIsNotFirstTime()}
      pages={[
        {
          backgroundColor: "#fe6e58",
          image: (
            <Image
              source={{ uri: imageURl }}
              style={{ width: 150, height: 150 }}
            />
          ),
          title: "Rewards",
          subtitle: "This is the subtitle that sumplements the title.",
        },
        {
          backgroundColor: "#999",
          image: (
            <Image
              source={{ uri: imageURl }}
              style={{ width: 150, height: 150 }}
            />
          ),
          title: "Lending",
          subtitle: "Beautiful, isn't it?",
        },
        {
          backgroundColor: "#999",
          image: (
            <Image
              source={{ uri: imageURl }}
              style={{ width: 150, height: 150 }}
            />
          ),
          title: "Budget",
          subtitle: "Beautiful, isn't it?",
        },
        {
          backgroundColor: "#999",
          image: (
            <Image
              source={{ uri: imageURl }}
              style={{ width: 150, height: 150 }}
            />
          ),
          title: "MarketPlace",
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );
};

export default Simple;
