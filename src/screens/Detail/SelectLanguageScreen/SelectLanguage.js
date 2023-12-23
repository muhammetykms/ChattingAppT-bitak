// ...
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import firebase from "../../../utils/firebase"; // Firebase konfigürasyonunuza göre güncelleyin,
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./SelectLanguage.style";
import jsonLanguages from "../../../../languageList.json";

const SelectLanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [languageList, setLanguageList] = useState([]);
  const [userSelectedLanguage, setUserSelectedLanguage] = useState(null); // Yeni eklenen state
  const navigation = useNavigation();

  useEffect(() => {
    // Dil listesini API'den al
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const languages = data.reduce((acc, country) => {
          if (country.languages) {
            const countryLanguages = Object.values(country.languages);
            acc.push(...countryLanguages);
          }
          return acc;
        }, []);
        const uniqueLanguages = [...new Set(languages)];
        const sortedLanguageList = uniqueLanguages
          .map((language) => ({
            code: language,
            name: language, // İsterseniz dil adını API'den çekebilirsiniz.
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // Alfabetik sıraya göre sırala

        setLanguageList(sortedLanguageList);
      })
      .catch((error) => console.error("Error fetching languages:", error));
  }, []);

  useEffect(() => {
    // Kullanıcının seçtiği dili AsyncStorage'den al ve state'e set et
    const getUserSelectedLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (storedLanguage) {
          setUserSelectedLanguage(storedLanguage);
        }
      } catch (error) {
        console.error(
          "Error getting selected language from AsyncStorage:",
          error
        );
      }
    };

    getUserSelectedLanguage();
  }, []);

  useEffect(() => {
    // Firebase kullanıcısını al
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("USERID");

        if (userId) {
          // Firestore referansını al
          const userRef = firebase.firestore().collection("users").doc(userId);

          // Firestore'dan seçilen dil bilgisini çek
          const userSnapshot = await userRef.get();

          if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            const userSelectedLanguage = userData.selectedLanguage;
            setSelectedLanguage(userSelectedLanguage);
          }
        }
      } catch (error) {
        console.error("Error getting user data from Firestore:", error);
      }
    };

    getUserData();
  }, []);

  const handleLanguageSelect = async (language) => {
    try {
      const userId = await AsyncStorage.getItem("USERID");
      const userRef = firebase.firestore().collection("users").doc(userId);

      // Firestore'dan seçilen dil bilgisini çek
      const userSnapshot = await userRef.get();

      // Firestore'da kayıtlı olan seçilen dil
      const firestoreSelectedLanguage = userSnapshot.exists
        ? userSnapshot.data().selectedLanguage
        : null;

      if (firestoreSelectedLanguage === null) {
        // Firestore'da dil bilgisi kayıtlı değilse set et
        await userRef.update({
          selectedLanguage: language,
        });

        // AsyncStorage'e seçilen dili kaydet
        await AsyncStorage.setItem("SELECTEDLANGUAGE", language);

        // State'i güncelle
        setUserSelectedLanguage(language);
      } else {
        // Firestore'da dil bilgisi kayıtlı ise ve seçilen dil değişmişse güncelle
        if (firestoreSelectedLanguage !== language) {
          await userRef.update({
            selectedLanguage: language,
          });

          // AsyncStorage'e seçilen dili kaydet
          await AsyncStorage.setItem("SELECTEDLANGUAGE", language);

          // State'i güncelle
          setUserSelectedLanguage(language);
        }
      }

      console.log("Selected language updated successfully!");
    } catch (error) {
      console.error("Error updating selected language:", error);
    }
  };
  console.log("(userSelectedLanguage: ", userSelectedLanguage);
  console.log("selectedLanguage: ", selectedLanguage);

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Language</Text>
      <Text>Seçili Olan Dil : {selectedLanguage}</Text>
      <FlatList
        data={languageList}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.languageButton,
              userSelectedLanguage === item.code && styles.selectedLanguage,
              selectedLanguage === null && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageSelect(item.code)}
          >
            <Text style={styles.languageButtonText}>{item.name}</Text>
            {userSelectedLanguage === item.code && (
              <Text style={styles.selectedIcon}>✔️</Text>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Geri dönme butonu */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SelectLanguageScreen;
