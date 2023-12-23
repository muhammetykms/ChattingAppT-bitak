import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Ekran arkaplan rengi
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black", // Başlık rengi
  },
  languageButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedLanguage: {
    backgroundColor: "gray", // Seçilen dilin arka plan rengi
  },
  languageButtonText: {
    fontSize: 16,
    color: "#333", // Dil adı rengi
    marginRight: 10,
    fontWeight: "bold",
  },
  selectedIcon: {
    fontSize: 20,
    color: "green", // Tik işareti rengi
  },
  goBackText: {
    marginTop: 20,
    color: "blue",
    fontSize: 16,
  },
  nullSelectedLanguage: {
    // Seçilen dil null olduğunda uygulanacak stil
    backgroundColor: "lightgray", // ya da istediğiniz bir arka plan rengi
    // Diğer stil özellikleri...
  },
});
export default styles;
