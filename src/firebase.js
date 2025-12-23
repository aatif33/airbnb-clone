import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC04EuI6CIdFL4A637ow-h2yd1hdxl4k04",
  authDomain: "airbnb-clone-8833a.firebaseapp.com",
  projectId: "airbnb-clone-8833a",
  storageBucket: "airbnb-clone-8833a.firebasestorage.app",
  messagingSenderId: "379431806744",
  appId: "1:379431806744:web:2704f27a190cd240c3606d",
  measurementId: "G-YXTXG24EQ0"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
