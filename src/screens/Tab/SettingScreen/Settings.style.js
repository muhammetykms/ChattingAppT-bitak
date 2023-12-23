// styles.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  userProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
    resizeMode: "contain",
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 18,
  },
  userAccount: {
    fontSize: 16,
  },
  settingList: {
    margin: 10,
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#d0d0d0",
    padding: 10,
  },
});

export default styles;
