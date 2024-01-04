import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./SignUp.style";
import Input from "../../../components/TextInput/Input";
import Button from "../../../components/Button";
import Banner from "../../../components/Banner/Banner";
import ModalSelector from "react-native-modal-selector";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "../../../utils/firebase";
import uuid from "react-native-uuid";
import languageList from "../../../../languageList.json";
import RNPickerSelect from "react-native-picker-select";

const SignUp = ({ navigation }) => {
  const userId = uuid.v4();
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [mail, setMail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const data = [
    { label: "Select Language", value: "", key: "0" },
    ...Object.keys(languageList).map((key) => ({
      label: `${key}`,
      value: key,
      key: key,
    })),
  ];

  const handleOptionChange = (value) => {
    setSelectedLanguage(value);
    console.log(value); // Selected language code
  };
  // const handleSignUp = async () => {
  //   try {
  //     const userCredential = await firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(mail, password);
  //     const user = userCredential.user;
  //     const userId = user.uid;

  //     // Firestore'a kullanıcı verilerini kaydetme
  //     await firebase.firestore().collection("Users").doc(userId).set({
  //       name: name,
  //       lastName: lastName,
  //       mail: mail,
  //       password: password,
  //       userId:userId,
  //     });

  //     Alert.alert("Kayıt", "Doğrulama e-postası gönderildi.");
  //     await user.sendEmailVerification();
  //     navigation.goBack();
  //   } catch (error) {
  //     console.error("Kayıt hatası:", error);
  //   }
  // };
  const registerUser = () => {
    const userId = uuid.v4();
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .set({
        name: name,
        lastname: lastName,
        mail: mail,
        password: password,
        userId: userId,
        selectedLanguage: selectedLanguage,
      })
      .then((res) => {
        console.log("user created ");
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validate = () => {
    let isValid = true;
    if (name == "") {
      isValid = false;
    }
    if (mail == "") {
      isValid = false;
    }
    if (password == "") {
      isValid = false;
    }
    if (confirmPass == "") {
      isValid = false;
    }
    if (confirmPass !== password) {
      isValid = false;
    }
    return isValid;
  };

  return (
    <ImageBackground
      source={require("../../../assets/welcomeBackground.png")}
      style={styles.background}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer}>
        <View style={styles.container}>
          <Banner title={"Kayıt Ol"} />
          <View style={styles.inputContainer}>
            <Input
              onChangeText={setName}
              value={name}
              placeholder={"İsim giriniz..."}
              keyboardType={"default"}
            />
            <Input
              onChangeText={setLastName}
              value={lastName}
              placeholder={"Soyisim giriniz..."}
              keyboardType={"default"}
            />
            <Input
              onChangeText={setMail}
              value={mail}
              placeholder={"Mail giriniz..."}
              keyboardType={"default"}
            />
            <Input
              onChangeText={setPassword}
              value={password}
              placeholder={"Şifre giriniz..."}
              keyboardType={"default"}
              secureTextEntry
            />
            <Input
              onChangeText={setConfirmPass}
              value={confirmPass}
              placeholder={"Tekrar şifre giriniz..."}
              keyboardType={"default"}
              secureTextEntry
            />
          </View>
          <View>
            <Text style={{ margin: 10, color: "#4E4E4E" }}>
              Sohbet edilirken kullanılacak olan bir dil seçiniz
            </Text>
            <RNPickerSelect
              items={data}
              placeholder={{ label: "Seçenekleri Seçin", value: null }}
              onValueChange={handleOptionChange}
              style={{
                inputIOS: {
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 4,
                  color: "#333",
                  paddingRight: 30,
                  textAlign: "center", // Center the text horizontally
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 4,
                  color: "#333",
                  paddingRight: 30,
                  textAlign: "center", // Center the text horizontally
                },
                placeholder: {
                  color: "#555",
                },
              }}
            />
            <Button
              title={"Kayıt Ol"}
              onPress={() => {
                if (validate()) {
                  // Use the selectedLanguage state where needed
                  console.log("Selected Language:", selectedLanguage);
                  registerUser();
                } else {
                  Alert.alert("Bilgileri eksik girdiniz");
                }
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default SignUp;
