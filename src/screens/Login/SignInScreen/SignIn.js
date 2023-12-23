import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import styles from "./SignIn.style";
import Button from "../../../components/Button";
import Banner from "../../../components/Banner";
import Input from "../../../components/TextInput/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/compat";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ navigation }) => {
  const [mail, setMail] = useState(null);
  const [password, setPassword] = useState(null);

  const [visible, setVisible] = useState(false);

  // const handleLogin = () => {
  //   if (mail !== "" && password !== "") {
  //     firebase
  //       .auth()
  //       .signInWithEmailAndPassword(mail, password)
  //       .then(() => {
  //         console.log("Login success");
  //         navigation.navigate("BottomTab");
  //       })
  //       .catch((error) => {
  //         console.error("Login error", error.message);
  //         Alert.alert("Login error", error.message);
  //       });
  //   }
  // };

  const loginUser = () => {
    setVisible(true);
    firebase
      .firestore()
      .collection("users")
      .where("mail", "==", mail)
      .get()
      .then((res) => {
        setVisible(false);
        if (res.docs.length > 0) {
          const userData = res.docs[0].data();
          console.log("userData: ", userData);
          if (userData.password === password) {
            console.log(JSON.stringify(userData));
            goToNext(
              userData.name,
              userData.mail,
              userData.userId,
              userData.lastname,
              userData.password
            );
            navigation.navigate("BottomTab");
          } else {
            Alert.alert("Şifre Yalnış");
          }
        } else {
          Alert.alert("Mail Yalnış");
        }
      })
      .catch((error) => {
        setVisible(false);
        console.log(error);
        Alert.alert("User not found");
      });
  };

  const goToNext = async (name, mail, userId, lastName, password) => {
    console.log("goToNext - Name:", name);
    console.log("goToNext - Mail:", mail);
    console.log("goToNext - UserID:", userId);
    console.log("goToNext - LastName:", lastName);
    await AsyncStorage.setItem("NAME", name);
    await AsyncStorage.setItem("MAIL", mail);
    await AsyncStorage.setItem("USERID", userId);
    await AsyncStorage.setItem("LASTNAME", lastName);
    await AsyncStorage.setItem("PASSWORD", password);

    navigation.navigate("BottomTab");
  };

  return (
    <ImageBackground
      source={require("../../../assets/welcomeBackground.png")}
      style={styles.background}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer}>
        <View style={styles.container}>
          <Banner title={"Giriş Yap"} />
          <View style={styles.energy}>
            <Image
              source={require("../../../assets/footerEnergy.png")}
              style={styles.energy}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              onChangeText={setMail}
              value={mail}
              placeholder={"Kullanıcı Adı giriniz..."}
              keyboardType={"default"}
            />
            <Input
              onChangeText={setPassword}
              value={password}
              placeholder={"Şifre giriniz..."}
              keyboardType={"default"}
              secureTextEntry
            />
          </View>
          <View style={styles.text_container}>
            <View style={styles.footer}>
              <View style={styles.row}>
                <Text style={styles.query_text}>Hesabın yok mu ?</Text>
                <TouchableOpacity
                  style={styles.signIn_button}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Kayıt Ol
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.pasForget_text}>Şifre mi unuttum ?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require("../../../assets/google.png")}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Google ile Giriş Yap</Text>
          </TouchableOpacity>
          <Button
            title={"Giriş Yap"}
            onPress={() => {
              loginUser();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default SignIn;
