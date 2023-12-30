import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import firebase from "../../../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserQRCodeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(""); // Add userId state

  // Fetch userId from AsyncStorage or wherever you store it
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("USERID");

        // storedUserId boş değilse ve tanımlıysa setUserId ile userId'i güncelle
        if (storedUserId && storedUserId.trim() !== "") {
          setUserId(storedUserId.trim());
        }
      } catch (error) {
        console.error("UserId alınırken hata oluştu:", error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch user data when userId changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // userId boş değilse Firebase'den verileri çek
        if (userId && userId.trim() !== "") {
          const userDoc = await firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .get();

          if (userDoc.exists) {
            setUserData(userDoc.data());
          } else {
            console.error("Kullanıcı bulunamadı");
          }
        }
      } catch (error) {
        console.error("Kullanıcı verileri çekilirken hata oluştu:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  // Update qrData based on the fetched user data
  const { name, mail } = userData;
  const qrData = `${name} ${mail} ${userId}`;

  return (
    <View style={styles.container}>
      <Text>QR Kodunuzu Okutunuz!</Text>
      <Text>User: {userId}</Text>
      <Text>Email: {mail}</Text>
      <QRCode value={qrData} size={300} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserQRCodeScreen;
