import React, { useState, useEffect } from "react";
import {
  StatusBar,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  View,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import Onboarding from "../components/Onboarding";
import NeokredGIF from "../assets/Grey.gif";
const { width, height } = Dimensions.get("window");
const DURATION = 400;
const LOGO_SIZE = 300;
const ICON_SIZE = 30;
const CLOSE_MODE = 200;
const ICON_LINE_HEIGHT = 2;
const closeItems = [0, 1];

const SplashIntro = (props) => {
  const [state, setState] = useState({
    animateStripe: new Animated.Value(height),
    animateBg: new Animated.Value(0),
    animateOpacity: new Animated.Value(1),
    finished: false,
    closeFinished: false,
    burgerFinished: false,
  });
  const closeAnimations = [];
  closeItems.forEach((i) => {
    closeAnimations.push(
      new Animated.Value(i === 0 ? -CLOSE_MODE : CLOSE_MODE)
    );
  });

  useEffect(() => {
    StatusBar.setHidden(true);
    setTimeout(() => {
      autoOpen();
    }, 6000);
  });

  const autoOpen = () => {
    setState((state) => ({ ...state, finished: !state.finished }));
    restartAnimation();
  };

  const animateClose = () => {
    const animations = closeItems.map((i) => {
      if (state.closeFinished) {
        return Animated.timing(closeAnimations[i], {
          toValue: i === 0 ? -CLOSE_MODE : CLOSE_MODE,
          duraction: DURATION,
          useNativeDriver: false,
        });
      } else {
        return Animated.sequence([
          Animated.delay(DURATION / 2),
          Animated.timing(closeAnimations[i], {
            toValue: 0,
            duraction: DURATION,
            useNativeDriver: false,
          }),
        ]);
      }
    });

    return Animated.stagger(150, animations);
  };

  const restartAnimation = () => {
    if (state.finished) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(state.animateBg, {
            toValue: 1,
            duration: DURATION / 10,
            useNativeDriver: false,
          }),
          Animated.timing(state.animateStripe, {
            toValue: height,
            duration: DURATION,
            easing: Easing.Out,
            useNativeDriver: false,
          }),
        ]),
        animateClose(),
        Animated.sequence([
          Animated.delay(DURATION - 150),
          Animated.timing(state.animateOpacity, {
            toValue: 1,
            duration: DURATION,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() => {
        state.animateBg.setValue(0);
        setState((state) => ({
          ...state,
          closeFinished: !state.closeFinished,
        }));
      });
    } else {
      Animated.parallel([
        Animated.timing(state.animateOpacity, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: false,
        }),

        animateClose(),

        Animated.sequence([
          Animated.delay(DURATION - 150),
          Animated.timing(state.animateStripe, {
            toValue: 0,
            duration: DURATION,
            easing: Easing.Out,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() => {
        state.animateOpacity.setValue(0);
        setState((state) => ({
          ...state,
          closeFinished: !state.closeFinished,
        }));
      });
    }
  };
  const top = state.animateStripe.interpolate({
    inputRange: [0, height],
    outputRange: [-height / 4, 0],
    extrapolate: "clamp",
  });

  const bottom = state.animateStripe.interpolate({
    inputRange: [0, height],
    outputRange: [height / 4, 0],
    extrapolate: "clamp",
  });

  const scaleLogo = state.animateOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      {/* <Onboarding /> */}
      <View
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          transform: [
            {
              rotate: "-35deg",
            },
          ],
        }}
      >
        <Animated.View
          style={[
            styles.strip,
            styles.top,
            {
              height: state.animateStripe,
              transform: [
                {
                  translateY: top,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.strip,
            styles.bottom,
            {
              height: state.animateStripe,
              transform: [
                {
                  translateY: bottom,
                },
              ],
            },
          ]}
        />
      </View>

      <Animated.Image
        source={NeokredGIF}
        style={[
          StyleSheet.absoluteFill,
          styles.image,
          {
            opacity: state.animateOpacity,
            alignSelf: "center",
            transform: [
              {
                scale: scaleLogo,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  closeContainer: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 40,
    right: 40,
  },
  line: {
    height: ICON_LINE_HEIGHT,
    width: ICON_SIZE,
    backgroundColor: "black",
  },
  lineMedium: {
    width: ICON_SIZE * 0.67,
    alignSelf: "flex-start",
  },
  lineSmall: {
    width: ICON_SIZE * 0.45,
    alignSelf: "flex-end",
  },
  image: {
    resizeMode: "contain",
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    top: height / 2 - LOGO_SIZE / 2,
    left: width / 2 - LOGO_SIZE / 2,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "black",
  },
  strip: {
    backgroundColor: "black",
    height: height,
    width: width * 3,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
});

export default SplashIntro;
