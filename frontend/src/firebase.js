import * as firebase from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMq0NaLKovh0ax2VomuJt-z_-axlQXD2k",
  authDomain: "blog-91d5f.firebaseapp.com",
  projectId: "blog-91d5f",
  storageBucket: "blog-91d5f.appspot.com",
  messagingSenderId: "838130927922",
  appId: "1:838130927922:web:1be1c488af0ef74000ef2b",
  measurementId: "G-RY9BE91LYC",
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;
