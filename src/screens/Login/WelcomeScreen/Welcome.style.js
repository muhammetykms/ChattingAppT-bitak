import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: windowHeight * 0.1,
  },
  energyIcon: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    margin: 10,
    tintColor: "white",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  headerText: {
    fontSize: windowWidth * 0.1,
    fontWeight: "bold",
    color: "white",
  },
  centerContent: {
    alignItems: "center",
    marginTop: windowHeight * 0.1,
  },
  readyText: {
    marginBottom: windowHeight * 0.02,
    fontSize: windowWidth * 0.065,
    color: "#C3C3C3",
  },
  welcomeText: {
    fontSize: windowWidth * 0.1,
    marginBottom: windowHeight * 0.03,
    color: "white",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  energy: {
    alignItems: "center",
    justifyContent: "center",
    bottom: -windowHeight * 0.06,
  },
  startText: {
    alignItems: "center",
    justifyContent: "center",
    bottom: -windowHeight * 0.06,
    fontSize: 20,
    color: "#C3C3C3",
    margin: 10,
  },
  endText: {
    alignItems: "center",
    justifyContent: "center",
    bottom: -windowHeight * 0.08,
    fontSize: windowWidth * 0.02,
    color: "#C3C3C3",
  },
  footerEnergyIcon: {
    bottom: -windowHeight * 0.08,
  },
});

export default styles;
