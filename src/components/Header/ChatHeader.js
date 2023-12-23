import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // veya başka bir ikon kütüphanesi
import GlobalContext from "../Context/Context";
import Avatar from "./Avatar";

export default function ChatHeader() {
  const route = useRoute();
  const navigation = useNavigation(); // Parantez ekleyerek fonksiyonu çağırın
  const {} = useContext(GlobalContext);
  console.log("Route: ", route.params);

  return (
    <View style={styles.images}>
      <Avatar size={40} user={route.params.user} />
      <View style={styles.name}>
        <Text style={{ color: "black", fontSize: 18 }}>
          {route.params.data.name}
        </Text>
      </View>
      <View style={styles.languageIcon}>
        <TouchableOpacity onPress={() => navigation.navigate("SelectLanguage")}>
          <FontAwesome name="language" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    marginLeft: Dimensions.get("window").width * 0.25,
  },
  languageIcon: {
    marginLeft: Dimensions.get("window").width * 0.21,
    marginBottom: Dimensions.get("window").height * 0.004,
  },
});
