import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import firebase from "../../../utils/firebase";
import { useRoute } from "@react-navigation/native";
import { set } from "firebase/database";

const QRScreen = () => {
  const route = useRoute(); // Move useRoute inside the component
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [id, setId] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const id = await AsyncStorage.getItem("USERID");
      console.log("UserID from AsyncStorage:", id);

      const mail = await AsyncStorage.getItem("MAIL");
      const name = await AsyncStorage.getItem("NAME");
      const lastName = await AsyncStorage.getItem("LASTNAME");

      setName(name);
      setLastName(lastName);
      setMail(mail);
      setId(id);
    } catch (error) {
      console.error("Error retrieving AsyncStorage values:", error);
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );

    try {
      // Extract name and email
      const [name, email] = data.split(", ");

      // Extract userId using a regular expression
      const userIdMatch = data.match(
        /(\b[\da-fA-F]{8}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{12}\b)$/
      );
      const userId = userIdMatch ? userIdMatch[0] : undefined;

      console.log("Name:", name);
      console.log("Email:", email);
      console.log("UserId:", userId);

      if (name && email && userId) {
        // Add name, email, and userId to the "friends" collection
        await firebase.firestore().collection("friends").add({
          name: name,
          email: email,
          userId: userId,
          // Add other fields if needed
        });

        // Display an alert
        Alert.alert(
          "Friend Added",
          "User data has been added to the friends collection!"
        );
      } else {
        console.error("Invalid data format. Some values are undefined.");
        Alert.alert("Error", "Invalid data format. Some values are undefined.");
      }
    } catch (error) {
      console.error("Error adding friend:", error.message);
      Alert.alert("Error", "Failed to add friend. Please try again.");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

export default QRScreen;
