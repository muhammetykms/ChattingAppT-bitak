import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./Welcome.style";
import style from "react-native-modal-picker/style";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../../assets/welcomeBackground.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Image
          style={styles.energyIcon}
          source={require("../../../assets/energy.png")}
        />
        <Text style={styles.headerText}>Bariyer</Text>
      </View>
      <View style={styles.centerContent}>
        <Text style={styles.welcomeText}>Hoşgeldiniz</Text>
        <Text style={styles.readyText}>Hazır mısınız?</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image
          style={styles.chatIcon}
          source={require("../../../assets/chat.png")}
        />
      </View>
      <View style={styles.energy}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.startText}>Başlayabilirsiniz</Text>
        </TouchableOpacity>
        <Image
          style={style.footerEnergyIcon}
          source={require("../../../assets/footerEnergy.png")}
          onPress={() => navigation.navigate("SignIn")}
        />
        <Text style={styles.endText}>©2023</Text>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
