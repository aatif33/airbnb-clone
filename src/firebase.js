import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSy......",
  authDomain: "airbnb-clone.firebaseapp.com",
  projectId: "airbnb-clone",
  storageBucket: "airbnb-clone.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
