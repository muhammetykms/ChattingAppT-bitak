import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Settings.style";
import firebase from "../../../utils/firebase";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // const [ID, setID] = useState("");

  const [avatarSource, setAvatarSource] = useState(null);

  const settingsData = [
    {
      name: "AccountDetail",
      title: "Hesap",
      icon: "person",
    },
    {
      title: "Gizlilik",
      icon: "lock-closed",
    },
    {
      title: "Sohbetler",
      icon: "chatbubble",
    },
    {
      title: "Bildirimler",
      icon: "notifications",
    },
    {
      title: "Saklama Alanı",
      icon: "save",
    },
    {
      title: "Yardım",
      icon: "help-circle",
    },
    {
      name: "ProfileQR",
      title: "QR",
      icon: "qr-code-outline",
    },
  ];

  useEffect(() => {
    getUsers();
    getUserImage();
  }, []);

  const getUsers = async () => {
    id = await AsyncStorage.getItem("USERID");
    console.log(id);
    // let tempData = [];
    const mail = await AsyncStorage.getItem("MAIL");
    const name = await AsyncStorage.getItem("NAME");
    const lastName = await AsyncStorage.getItem("LASTNAME");
    const password = await AsyncStorage.getItem("PASSWORD");
    console.log(name);
    console.log(lastName);
    setName(name);
    setLastName(lastName);
    setMail(mail);
    setPassword(password);
    console.log("şiifre ", password);
  };

  const getUserImage = async () => {
    const userId = await AsyncStorage.getItem("USERID");

    if (userId) {
      const userImagesRef = firebase
        .firestore()
        .collection("userProfileImages");

      try {
        const doc = await userImagesRef.doc(userId).get();

        if (doc.exists) {
          // Firestore'dan alınan fotoğrafı kullanıcıya göster
          setAvatarSource({ uri: doc.data().imageUrl });
        }
      } catch (error) {
        console.error("Error getting user image:", error);
      }
    }
  };
  const handleImagePicker = async () => {
    const userId = await AsyncStorage.getItem("USERID");
    if (userId) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        const imageUrl = selectedImage.uri;

        // Firestore'a yeni bir koleksiyon olan "userProfileImages" oluştur
        const userProfileImagesRef = firebase
          .firestore()
          .collection("userProfileImages");

        try {
          // Firestore'a yeni belge ekle (userProfileImages koleksiyonuna)
          await userProfileImagesRef.doc(userId).set({
            userId,
            imageUrl,
          });

          // Kullanıcı koleksiyonundaki belgeyi güncelle (users koleksiyonuna)
          const usersRef = firebase.firestore().collection("users");
          await usersRef.doc(userId).update({
            imageUrl: imageUrl,
          });

          // Eğer başarıyla eklendiyse, avatarSource'u güncelle
          setAvatarSource({ uri: imageUrl });
          console.log(
            "Fotoğraf başarıyla yüklendi ve kullanıcı profili güncellendi."
          );
        } catch (error) {
          console.error("Firestore'a resim eklenirken hata oluştu: ", error);
        }
      }
    }
  };

  console.log(avatarSource);

  const navigateToDetail = (setting) => {
    if (setting) {
      const userData = {
        name: name,
        mail: mail,
        avatarSource: avatarSource,
        lastName: lastName,
        password: password,
        id: id,
      };
      navigation.navigate(setting.name, { data: userData }); // 'AccountDetail' sayfasına yönlendir
    } else {
      // Diğer ayar sayfalarına yönlendirme işlemleri
    }
  };
  console.log("Vatar: ", avatarSource);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.pageTitle}>Ayarlar</Text>
        <TextInput placeholder="Ayarları Ara" style={styles.searchInput} />
        <View style={styles.userContainer}>
          {avatarSource && avatarSource.uri !== null && (
            <Image source={avatarSource} style={styles.userProfileImage} />
          )}
          {(!avatarSource || avatarSource.uri === null) && (
            <TouchableOpacity onPress={handleImagePicker}>
              <Text>Fotoğraf Seç</Text>
            </TouchableOpacity>
          )}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {name} {lastName}
            </Text>
          </View>
        </View>
        <View style={styles.settingList}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Ayarlar</Text>
          {settingsData.map((setting, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToDetail(setting)}
              style={styles.settingItem}
            >
              <Ionicons name={setting.icon} size={24} color="black" />
              <Text>{setting.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
