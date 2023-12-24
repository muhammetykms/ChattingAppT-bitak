import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../../../utils/firebase";

import styles from "./Status.style";

const Status = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const [avatarSources, setAvatarSources] = useState({});
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (friends.length > 0) {
      friends.forEach((friend) => {
        getUserImage(friend.userId);
      });
    }
  }, [friends]);

  const fetchData = async () => {
    await getFriends();
  };

  const getUserImage = async (userId) => {
    const userImagesRef = firebase.firestore().collection("userProfileImages");

    try {
      const doc = await userImagesRef.doc(userId).get();

      if (doc.exists) {
        setAvatarSources((prev) => ({
          ...prev,
          [userId]: { uri: doc.data().imageUrl },
        }));
      }
    } catch (error) {
      console.error("Error getting user image:", error);
    }
  };

  const getFriends = async () => {
    try {
      const id = await AsyncStorage.getItem("USERID");

      // Query the "friends" collection where the current user's ID is in the "userId" field
      const friendsQuery = await firebase
        .firestore()
        .collection("friends")
        .where("userId", "==", id)
        .get();

      // Extract the friends directly from the retrieved documents
      const friendsData = friendsQuery.docs.map((doc) => doc.data());

      // Set the friends state with the retrieved data
      setFriends(friendsData || []);
    } catch (error) {
      console.error("Error getting friends:", error);
    }
  };

  return (
    <View>
      <FlatList
        data={friends}
        renderItem={({ item }) => {
          const friendUserId = item.userId;
          const friendAvatar = avatarSources[friendUserId]
            ? { uri: avatarSources[friendUserId].uri }
            : null;

          return (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                navigation.navigate("ChatDetail", { data: item, id: id });
              }}
            >
              <Image source={friendAvatar} style={styles.userIcon} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
};

export default Status;
