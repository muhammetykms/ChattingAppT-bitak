import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./Search.style";
import firebase from "../../../utils/firebase";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersSnapshot = await firebase
        .firestore()
        .collection("users")
        .get();
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUsers(usersData);

      const loggedInUserData = usersData.find((user) => user.loggedIn);

      if (loggedInUserData) {
        setCurrentUser(loggedInUserData);

        const friendRequestsSnapshot = await firebase
          .firestore()
          .collection(`users/${loggedInUserData.id}/friendRequests`)
          .get();
        const friendRequestsData = friendRequestsSnapshot.docs.map(
          (doc) => doc.id
        );
        setFriendRequests(friendRequestsData);
      }
    } catch (error) {
      console.error("Kullanıcıları getirirken hata oluştu:", error);
    }
  };

  const handleFriendRequest = async (userId) => {
    console.log("currentUser: ", currentUser);

    const isFriendRequested = friendRequests.includes(userId);

    if (isFriendRequested) {
      // Eğer arkadaşlık isteği zaten varsa, bir şey yapma
      return;
    }

    if (friendRequests.includes(userId)) {
      // Eğer kullanıcı zaten arkadaşlık isteği göndermişse, listeden kaldır
      setFriendRequests(friendRequests.filter((id) => id !== userId));
    } else {
      // Eğer kullanıcı arkadaşlık isteği göndermemişse, listeye ekle
      setFriendRequests([...friendRequests, userId]);

      if (currentUser) {
        const friendData = allUsers.find((user) => user.id === userId);

        if (friendData) {
          await firebase
            .firestore()
            .collection(`users/${currentUser.id}/friends`)
            .add({
              name: friendData.name,
              lastname: friendData.name,
              selectedLanguage: friendData.selectedLanguage,
              email: friendData.mail,
              userId: friendData.userId,
              imageUrl: friendData.imageUrl,
              // Diğer alanları da ekleyebilirsiniz
            });
        }
      }
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);

    if (text === "") {
      setSearchResults([]);
    } else {
      const results = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(text.toLowerCase()) ||
          (user.lastname &&
            user.lastname.toLowerCase().includes(text.toLowerCase()))
      );
      setSearchResults(results);
    }
  };

  const renderUserItem = ({ item }) => {
    const isFriendRequested = friendRequests.includes(item.id);
    if (searchText !== "") {
      return (
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <Image style={styles.userImage} source={{ uri: item.imageUrl }} />
            <View style={styles.textContainer}>
              <Text style={styles.userName}>
                {item.name} {item.lastname}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.friendRequestButton,
              isFriendRequested && { backgroundColor: "green" },
            ]}
            onPress={() => handleFriendRequest(item.id)}
            disabled={isFriendRequested} // Arkadaşlık isteği kabul edilmişse, butonu devre dışı bırak
          >
            <View style={styles.icon}>
              <Icon
                name={isFriendRequested ? "check" : "user-plus"}
                size={15}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Kullanıcı ara..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={searchResults.length > 0 ? searchResults : allUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Search;
