import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../../../utils/firebase";

import styles from "./Chat.style";
let id = "";
const Chat = ({ navigation }) => {
  const [users, setUsers] = useState(null);
  const [avatarSource, setAvatarSource] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      users.forEach((user) => {
        getUserImage(user.userId);
      });
    }
  }, [users]);

  const fetchData = async () => {
    await getUsers();
  };

  const getUserImage = async (userId) => {
    const userImagesRef = firebase.firestore().collection("userProfileImages");

    try {
      const doc = await userImagesRef.doc(userId).get();

      if (doc.exists) {
        setAvatarSource((prev) => ({
          ...prev,
          [userId]: { uri: doc.data().imageUrl },
        }));
      }
    } catch (error) {
      console.error("Error getting user image:", error);
    }
  };

  const getUsers = async () => {
    id = await AsyncStorage.getItem("USERID");
    console.log(id);
    // let tempData = [];
    const mail = await AsyncStorage.getItem("MAIL");
    console.log(mail);
    firebase
      .firestore()
      .collection("users")
      .where("mail", "!=", mail)
      .get()
      .then((res) => {
        if (res.docs != []) {
          let tempData = res.docs.map((item) => item.data());

          tempData = tempData.filter((user) => user.id !== id);
          // res.docs.map((item) => {
          //   tempData.push(item.data());
          // });
          setUsers(tempData);
        } else {
          setUsers([]);
        }
      });
  };
  console.log("Userslar: ", users);

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item, index }) => {
          const userId = item.userId;
          const avatarSources = avatarSource[userId]
            ? { uri: avatarSource[userId].uri }
            : null;

          return (
            <TouchableOpacity
              style={[styles.userItem, { backgroundColor: "white" }]}
              onPress={() => {
                navigation.navigate("ChatDetail", { data: item, id: id });
              }}
            >
              <Image source={avatarSources} style={styles.userIcon} />

              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
};

export default Chat;
