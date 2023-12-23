// styles.js

import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "purple",
    fontSize: 20,
    fontWeight: "600",
  },
  userItem: {
    width: Dimensions.get("window").width - 50,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: "center",
  },
  userProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
    resizeMode: "contain",
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: { color: "black", marginLeft: 20, fontSize: 20 },
});

export default styles;
