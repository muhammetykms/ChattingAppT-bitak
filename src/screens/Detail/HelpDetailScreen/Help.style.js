import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    borderRadius: 50, // Yuvarlak resim için
    overflow: "hidden",
    marginBottom: 30,
  },
  roundImage: {
    width: windowWidth * 0.76,
    height: windowHeight * 0.35,
    borderRadius: 50, // Yuvarlak resim için
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  licenseText: {
    fontSize: 12,
    color: "gray",
  },
});
export default styles;
