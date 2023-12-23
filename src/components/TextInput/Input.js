import React from "react";
import { View, TextInput } from "react-native";
import styles from "./Input.style";

export default function Input({
  onChangeText,
  value,
  placeholder,
  keyboardType,
  secureTextEntry,
}) {
  return (
    <View>
      <TextInput
        style={styles.Input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={"white"}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
