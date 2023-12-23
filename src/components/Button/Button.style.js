import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth * 0.6,
    height: windowHeight * 0.08,
    borderRadius: 50,
    elevation: 5, // Gölge yüksekliği
    shadowColor: "#2E2E2E", // Gölge rengi
    shadowOffset: { width: 0, height: 2 }, // Gölge yönü (x, y)
    shadowOpacity: 0.3, // Gölge opaklığı
    shadowRadius: 3, // Gölge yarıçapı
  },
});
