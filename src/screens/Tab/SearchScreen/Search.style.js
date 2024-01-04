import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  friendItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  friendName: {
    fontSize: 16,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  textContainer: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
  },
  friendRequestButton: {
    backgroundColor: "#2E2E2E",
    padding: 10,
    borderRadius: 50,
  },
  icon: {
    borderRadius: 50,
  },
});

export default styles;
