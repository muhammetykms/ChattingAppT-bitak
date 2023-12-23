import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDydVJ-Esv7OyxlEwGCW0TlMDnaoPUG7ck",
  authDomain: "dilbariyerleri.firebaseapp.com",
  projectId: "dilbariyerleri",
  storageBucket: "dilbariyerleri.appspot.com",
  messagingSenderId: "724112367232",
  appId: "1:724112367232:web:3e5b37994e5689b8375065",
  measurementId: "G-9HXS2FS11R",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
export const auth = getAuth();
export const database = getFirestore();
