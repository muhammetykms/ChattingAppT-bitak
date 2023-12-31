import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import firebase from "../../../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons"; // veya başka bir ikon kütüphanesi
import Avatar from "../../../components/Header/Avatar";

const Chat = ({ navigation }) => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();

  useEffect(() => {
    userGetMessages();
  }, [route.params.id, route.params.data.userId]);

  const languagesJson = require("../../../../languageList.json");

  const translateMessage = async (text, fromLanguage, toLanguage) => {
    const fromLanguageCode = languagesJson[fromLanguage.toLowerCase()];
    const toLanguageCode = languagesJson[toLanguage.toLowerCase()];
    console.log("fromLanguageCode", fromLanguageCode);
    console.log("toLanguageCode", toLanguageCode);

    try {
      const translation = await translateText(
        text,
        fromLanguageCode,
        toLanguageCode
      );
      return translation;
    } catch (error) {
      console.error("Çeviri hatası (translateMessage):", error);
      return text; // Hata durumunda orijinal metni döndür
    }
  };

  const translateText = async (text, fromLanguageCode, toLanguageCode) => {
    const subscriptionKey = "5a6b87fa889f4bb1b7945095f990d7b7";
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const path = "/translate?api-version=3.0";
    const params = `&from=${toLanguageCode}&to=${fromLanguageCode}`;
    const url = `${endpoint}${path}${params}`;

    const headers = {
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Ocp-Apim-Subscription-Region": "eastus",
      "Content-type": "application/json",
    };

    const body = [{ text }];

    try {
      const response = await axios.post(url, body, { headers });
      return response.data[0].translations[0].text;
    } catch (error) {
      console.error("Çeviri hatası (translateText):", error);
      throw error; // Hata durumunda hatayı tekrar fırlat
    }
  };
  const userGetMessages = async () => {
    const subscriber = firebase
      .firestore()
      .collection("chats")
      .doc(route.params.id + route.params.data.userId)
      .collection("messages")
      .orderBy("createdAt", "desc");

    subscriber.onSnapshot(async (querySnapshot) => {
      const allMessages = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const createdAt =
            data && data.createdAt && data.createdAt.toDate
              ? data.createdAt.toDate()
              : new Date();

          // Mesajı gönderen kullanıcının dil tercihini al
          const senderLanguageSnapshot = await firebase
            .firestore()
            .collection("users")
            .doc(route.params.id)
            .get();
          const senderLanguage = senderLanguageSnapshot.data().selectedLanguage;
          console.log("senderLanguageSnapshot: ", senderLanguage);

          // Mesajı alan kullanıcının dil tercihini al
          const recipientLanguageSnapshot = await firebase
            .firestore()
            .collection("users")
            .doc(route.params.data.userId)
            .get();

          const recipientLanguage =
            recipientLanguageSnapshot.data().selectedLanguage;
          console.log("recipientLanguage: ", recipientLanguage);

          // Mesajı, alıcının diline çevir
          try {
            const translatedText = await translateMessage(
              data.text,
              senderLanguage,
              recipientLanguage
            );
            return {
              ...data,
              text: translatedText,
              createdAt: createdAt,
              translatedLanguage: recipientLanguage,
            };
          } catch (error) {
            console.error("Çeviri hatası - Hata Detayı:", error);
            // Burada hatanın detayını inceleyerek sorunlu metni belirleyebilirsiniz
            return {
              ...data,
              text: "HATA: Çeviri yapılamadı",
              createdAt: createdAt,
              translatedLanguage: recipientLanguage,
            };
          }
        })
      );
      setMessageList(allMessages);
    });

    return () => subscriber();
  };

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];

    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };

    setMessageList((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );

    firebase
      .firestore()
      .collection("chats")
      .doc("" + route.params.id + route.params.data.userId)
      .collection("messages")
      .add(myMsg);

    firebase
      .firestore()
      .collection("chats")
      .doc("" + route.params.data.userId + route.params.id)
      .collection("messages")
      .add(myMsg);
  }, []);

  // ... (Diğer fonksiyonlar)
  const renderMessage = (props) => {
    const { currentMessage } = props;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: 8,
          padding: 10,
        }}
      >
        {currentMessage.user._id !== route.params.id && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: route.params.data.imageUrl }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 10,
              }}
            />
          </View>
        )}
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: "#D3D3D3",
            },
          }}
        />
      </View>
    );
  };
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#F4F4F4", // Özelleştirmek istediğiniz arka plan rengi
          borderTopColor: "#E0E0E0", // İstediğiniz üst kenar çizgisi rengi
          borderTopWidth: 1, // İstediğiniz üst kenar çizgisi kalınlığı
          margin: 7,
          borderRadius: 50,
        }}
      />
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/welcomeBackground.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.images}>
            <Avatar size={40} />
            <View style={styles.name}>
              <Text style={{ color: "white", fontSize: 18 }}>
                {route.params.data.name}
              </Text>
            </View>
            <View style={styles.languageIcon}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SelectLanguage")}
              >
                <FontAwesome name="language" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <GiftedChat
          messages={messageList}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: route.params.id,
          }}
          renderMessage={renderMessage}
          renderInputToolbar={renderInputToolbar}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  background: {
    flex: 1,
  },
  images: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Dimensions.get("window").width * 0.08,
  },
  name: {
    marginLeft: Dimensions.get("window").width * 0.21,
  },
  languageIcon: {
    marginLeft: Dimensions.get("window").width * 0.23,
    marginBottom: Dimensions.get("window").height * 0.004,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
