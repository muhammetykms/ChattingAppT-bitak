import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default styles = StyleSheet.create({
  Input: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.9,
    margin: 8,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    padding: 23,
    borderRadius: 50,
    color: "white",
  },
});
