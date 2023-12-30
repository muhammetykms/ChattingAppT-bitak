import * as React from "react";
//  --------------Screens-----------------
import SignInScreen from "../screens/Login/SignInScreen/SignIn";
import SignUpScreen from "../screens/Login/SignUpScreen/SignUp";
import WelcomeScreen from "../screens/Login/WelcomeScreen";
import ForgotPasswordScreen from "../screens/Login/ForgotPasswordScreen/ForgotPassword";

// --------------Tabs-----------------
import ChatScreen from "../screens/Tab/ChatScreen/Chat";
// import CallsScreen from "../screens/Tab/CallsScreen/Calls";
import QRScreen from "../screens/Tab/QRScreen/QR";
import SettingsScreen from "../screens/Tab/SettingScreen/Settings";
import StatusScreen from "../screens/Tab/StatusScreen/Status";

// --------------Components-----------------
import ChatHeader from "../components/Header/ChatHeader";

// --------------Details-----------------
import ChatDetailScreen from "../screens/Detail/ChatDetailScreen/ChatDetail";
import AccountDetailScreen from "../screens/Detail/AccountDetailScreen/AccountDetail";
import ProfileQRScreen from "../screens/Detail/ProfileQRScreen/ProfileQR";
import SelectLanguageScreen from "../screens/Detail/SelectLanguageScreen/SelectLanguage";

// --------------Navigations-----------------
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Sohbetler") {
            iconName = "md-chatbubbles"; // Ionicons için kullanılan özel ikon adını buraya ekleyin
          } else if (route.name === "Ayarlar") {
            iconName = "settings-outline"; // Özel simge adını buraya ekleyin
          } else if (route.name === "Durum") {
            iconName = "home-outline"; // Özel simge adını buraya ekleyin
          } else if (route.name === "Aramalar") {
            iconName = "call"; // Özel simge adını buraya ekleyin
          } else if (route.name === "QR") {
            iconName = "qr-code-outline"; // Özel simge adını buraya ekleyin
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Durum"
        component={StatusScreen}
        options={{ tabBarLabel: "Durum" }}
      />
      {/* <Tab.Screen
        name="Aramalar"
        component={CallsScreen}
        options={{ tabBarLabel: "Aramalar" }}
      /> */}
      <Tab.Screen
        name="QR"
        component={QRScreen}
        options={{ tabBarLabel: "QR" }}
      />
      <Tab.Screen
        name="Sohbetler"
        component={ChatScreen}
        options={{ tabBarLabel: "Sohbetler" }}
      />
      <Tab.Screen
        name="Ayarlar"
        component={SettingsScreen}
        options={{ tabBarLabel: "Ayarlar", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="BottomTab"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{ headerTitle: (props) => <ChatHeader {...props} /> }}
      />
      <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
      <Stack.Screen name="ProfileQR" component={ProfileQRScreen} />
      <Stack.Screen
        name="SelectLanguage"
        component={SelectLanguageScreen}
        options={{
          presentation: "modal", // Bu, ekranın modal olarak açılmasını sağlar
          headerShown: false, // Bu, üst başlığın görünmemesini sağlar
          cardStyle: { backgroundColor: "transparent" }, // Bu, modal ekranın arkaplanının saydam olmasını sağlar
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
