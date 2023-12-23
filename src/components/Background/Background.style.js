import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // Resmi sayfanın tamamına sığdırmak için kullanılır
    justifyContent: "center",
  },
});

export default styles;
