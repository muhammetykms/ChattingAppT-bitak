import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: windowHeight * 0.0001,
  },
  keyboardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    bottom: windowHeight * 0.02,
  },
  query_text: {
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  footer: {
    bottom: windowHeight * 0.02,
  },
  energy: {
    alignItems: "center",
    justifyContent: "center",
    bottom: windowHeight * 0.001,
  },
  button: {
    width: 250,
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  energyIcon: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    tintColor: "white",
  },
  headerText: {
    fontSize: windowWidth * 0.1,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: windowHeight * 0.1,
  },
  userNameInput: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.9,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    color: "black",
  },
  button: {
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    width: 229,
    height: 60,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#2E2E2E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  text_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignSelf: "center",
  },
  query_text: {
    color: "white",
    marginLeft: 90,
  },
  signIn_button: {
    color: "",
    marginRight: 90,
  },
  pasForget_text: {
    color: "#4E4A4A",
    alignSelf: "center",
    marginTop: 10,
    fontWeight: "800",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
  },
  googleIcon: {
    width: windowWidth * 0.07,
    height: windowHeight * 0.03,
    marginRight: 10,
    borderRadius: 50,
  },
  googleButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {},
});

export default styles;
