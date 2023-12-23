import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./Button.style";
export default function Button({ title, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={{ color: "white" }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
