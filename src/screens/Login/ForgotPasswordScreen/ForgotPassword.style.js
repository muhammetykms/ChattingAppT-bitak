import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    margin: 12,
    padding: 10,
    color: "black",
  },
  textInput_container: {
    height: 50,
    marginTop: 80,
  },
});
