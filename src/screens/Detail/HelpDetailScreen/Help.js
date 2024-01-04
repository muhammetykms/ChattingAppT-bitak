// screens/HelpScreen.js

import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import styles from "./Help.style";
import Banner from "../../../components/Banner";
const Help = () => {
  return (
    <ImageBackground
      source={require("../../../assets/welcomeBackground.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Banner title={"Yardım"} />
        {/* Yuvarlak resim */}
        <View style={styles.imageContainer}>
          {/* <Image
            source={require("../../../assets/energy.png")} // Resminizin yolunu belirtin
            style={styles.roundImage}
          /> */}
        </View>

        {/* Yardım Merkezi, Bize Ulaşın, Koşullar ve Gizlilik İlkesi */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Yardım Merkezi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Bize Ulaşın</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Koşullar ve Gizlilik İlkesi</Text>
          </TouchableOpacity>
        </View>

        {/* Lisanslar ve Yapım Yılı */}
        <Text style={styles.licenseText}>© 2024 Dil Bariyerleri</Text>
      </View>
    </ImageBackground>
  );
};

export default Help;
