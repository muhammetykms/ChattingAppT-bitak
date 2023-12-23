import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: windowHeight * 0.03,
  },
  energyIcon: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    margin: 10,
    tintColor: "white",
  },
  headerText: {
    fontSize: windowWidth * 0.1,

    fontWeight: "bold",
    color: "white",
  },

  container: {
    flexDirection: "row", // Elemanları yatayda sıralar
    alignItems: "center", // Elemanları dikeyde ortalar
    justifyContent: "center",
    bottom: windowHeight * 0.001,
  },
  text: {
    fontSize: 20,
    marginRight: windowWidth * 0.4, // Metin ile ikon arasında boşluk bırakır
    color: "white",
  },
  icon: {
    width: 48,
    height: 45,
  },
});

export default styles;
