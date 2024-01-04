import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

const Privacy = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gizlilik Ayarları</Text>
        <Text style={styles.sectionText}>
          Uygulamamız, mesajlaşma verilerinizi güvenli bir şekilde
          saklamaktadır. Bu verileri paylaşmıyor veya üçüncü taraflarla
          paylaşmıyoruz.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionSubTitle}>Veri Toplama ve Kullanımı</Text>
        <Text style={styles.sectionText}>
          Uygulamamız sadece mesajlaşma sürecinizi sağlamak ve geliştirmek
          amacıyla gerekli verileri toplar ve kullanır.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionSubTitle}>Güvenlik</Text>
        <Text style={styles.sectionText}>
          Mesajlarınız end-to-end şifreleme ile korunmaktadır. Bu, yalnızca
          sizin ve alıcının mesajları okuyabilmesi anlamına gelir.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionSubTitle}>Çerezler</Text>
        <Text style={styles.sectionText}>
          Uygulamamız, kullanıcı deneyimini geliştirmek ve kişiselleştirmek için
          çerezleri kullanabilir.
        </Text>
      </View>

      {/* Daha fazla bilgi ekleyebilirsiniz */}

      <View style={styles.section}>
        <Text style={styles.sectionText}>
          Bu gizlilik politikası en son güncellendi: Ocak 2024.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionSubTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Privacy;
