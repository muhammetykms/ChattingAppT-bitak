import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  ActionSheetIOS,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import firebase from "../../../utils/firebase";
import { useTogglePasswordVisibility } from "../../../components/useTogglePasswordVisibility";
import * as ImagePicker from "expo-image-picker";

const AccountDetail = (props) => {
  const route = useRoute();
  const [isChanged, setIsChanged] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  // const [image, setImage] = useState(route.params.data.avatarSource);
  const [userInfo, setUserInfo] = useState({
    firstName: route.params.data.name,
    lastName: route.params.data.lastName,
    email: route.params.data.mail,
    password: route.params.data.password,
    image: route.params.data.avatarSource,
    id: route.params.data.id,
  });

  const handleInputChange = (field, value) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [field]: value }));
    setIsChanged(true);
  };

  const handleSaveChanges = async () => {
    try {
      const userRef = firebase.firestore().collection("users").doc(userInfo.id);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("Güncellenmek istenen belge bulunamadı.");
      }

      const updatedValues = {
        name: userInfo.firstName,
        lastname: userInfo.lastName,
        mail: userInfo.email,
        password: userInfo.password,
      };

      Object.keys(updatedValues).forEach((field) => {
        if (userDoc.data()[field] !== updatedValues[field]) {
          userRef.update({
            [field]: updatedValues[field],
          });
        }
      });

      console.log("Kullanıcı bilgileri başarıyla güncellendi.");
      setIsChanged(false);
    } catch (error) {
      console.error("Firebase güncelleme hatası:", error.message);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      const updateImageUrl = result.assets[0].uri;
      // Kullanıcı kimliğini belirtin
      const userId = userInfo.id;
      // Firestore'daki belgeyi güncelle
      const userDocRef = firebase.firestore().collection("users").doc(userId);

      // users koleksiyonundaki belgeyi güncelle
      await userDocRef.update({
        imageUrl: updateImageUrl,
      });

      // userProfileImages koleksiyonundaki belgeyi güncelle
      const userProfileImageDocRef = firebase
        .firestore()
        .collection("userProfileImages")
        .doc(userId);
      await userProfileImageDocRef.update({
        imageUrl: updateImageUrl,
      });

      console.log("Belge başarıyla güncellendi.");
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleRemoveImage = async () => {
    Alert.alert(
      "Fotoğrafı Kaldır",
      "Fotoğrafı kaldırmak istediğinize emin misiniz?",
      [
        {
          text: "Vazgeç",
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: async () => {
            try {
              const userId = userInfo.id;

              // Reference to the document in userProfileImages collection
              const userRef = firebase
                .firestore()
                .collection("userProfileImages")
                .doc(userId);

              // Reference to the document in users collection
              const usersRef = firebase
                .firestore()
                .collection("users")
                .doc(userId);

              // Firestore'dan kullanıcının mevcut verilerini getir
              const userDoc = await userRef.get();

              if (userDoc.exists) {
                // Kullanıcının imageUrl alanındaki fotoğraf URL'sini al
                const imageUrl = userDoc.data().imageUrl;

                if (imageUrl) {
                  // Firestore'daki imageUrl alanını null yap ve kullanıcı verilerini güncelle
                  await userRef.update({ imageUrl: null });
                  await usersRef.update({ imageUrl: null });

                  setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    image: null,
                  }));

                  console.log(
                    "Firestore'dan imageUrl başarıyla güncellendi:",
                    imageUrl
                  );
                } else {
                  console.warn(
                    "Kullanıcının zaten bir profil resmi bulunmuyor."
                  );
                }
              } else {
                console.error("Kullanıcı belgesi bulunamadı.");
              }
            } catch (error) {
              console.error("Firestore güncelleme hatası:", error.message);
            }
          },
        },
      ]
    );
  };

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Fotoğrafı Değiştir", "Fotoğrafı Kaldır", "İptal"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          pickImage();
        } else if (buttonIndex === 1) {
          handleRemoveImage();
        }
      }
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Pressable onPress={showActionSheet}>
          <Image
            source={
              route.params.data.avatarSource &&
              route.params.data.avatarSource.uri
                ? { uri: route.params.data.avatarSource.uri }
                : require("../../../assets/energy.png")
            }
            style={styles.profileImage}
          />
        </Pressable>

        <Text style={styles.label}>Ad:</Text>
        <TextInput
          style={styles.input}
          placeholder="Adınız"
          value={userInfo.firstName}
          onChangeText={(text) => handleInputChange("firstName", text)}
        />

        <Text style={styles.label}>Soyad:</Text>
        <TextInput
          style={styles.input}
          placeholder="Soyadınız"
          value={userInfo.lastName}
          onChangeText={(text) => handleInputChange("lastName", text)}
        />

        <Text style={styles.label}>E-posta:</Text>
        <TextInput
          style={styles.input}
          placeholder="E-posta adresiniz"
          value={userInfo.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />

        <Text style={styles.label}>Şifre:</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Şifreniz"
            secureTextEntry={passwordVisibility}
            value={userInfo.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />

          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons
              name={rightIcon}
              size={22}
              color="#232323"
            />
          </Pressable>
        </View>

        <Button
          title="Değişiklikleri Kaydet"
          onPress={handleSaveChanges}
          disabled={!isChanged}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignSelf: "center",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
});

export default AccountDetail;
