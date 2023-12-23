import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import styles from "./ForgotPassword.style";
import Input from "../../../components/TextInput/Input";
import Button from "../../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Banner from "../../../components/Banner";

const ForgotPass = () => {
  const [mail, setMail] = useState(null);
  return (
    <ImageBackground
      source={require("../../../assets/welcomeBackground.png")}
      style={styles.background}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer}>
        <View style={styles.container}>
          <Banner title={"Şifre Yenileme"} />
          <View style={styles.textInput_container}>
            <Input
              onChangeText={setMail}
              value={mail}
              placeholderTextColor={"#1c1c1c"}
              placeholder="E-Mail..."
            />
            <Button title={"Şifre Yenile"} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
export default ForgotPass;
