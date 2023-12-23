import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./Background.style";

const Background = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/welcomeBackground.png")}
        style={styles.background}
      ></ImageBackground>
    </View>
  );
};
export default Background;
