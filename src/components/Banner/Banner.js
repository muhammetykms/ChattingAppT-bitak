import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./Banner.style";

const Banner = ({ title }) => {
  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.energyIcon}
          source={require("../../assets/energy.png")}
        />
        <Text style={styles.headerText}>Bariyer</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Image style={styles.icon} source={require("../../assets/chat.png")} />
      </View>
    </View>
  );
};
export default Banner;
