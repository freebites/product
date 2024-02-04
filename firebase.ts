import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
	getAuth,
	getReactNativePersistence,
	initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
	apiKey: "AIzaSyBY6TP8P-sWJOjvqp9UDol-3Ab5SHDQicY",
	authDomain: "freebites-ff666.firebaseapp.com",
	projectId: "freebites-ff666",
	storageBucket: "freebites-ff666.appspot.com",
	messagingSenderId: "70359539653",
	appId: "1:70359539653:web:46820f5e32e4441ecdf5ac",
	measurementId: "G-19EBVTF027",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
// initialize auth with persitance?
initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const auth = getAuth();
export { auth, getAuth };
