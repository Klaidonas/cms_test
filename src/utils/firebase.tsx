// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABAc3zb_FIZEq2wkYBN0nea4PJkBNIHT0",
  authDomain: "cms-test-d56c9.firebaseapp.com",
  projectId: "cms-test-d56c9",
  storageBucket: "cms-test-d56c9.appspot.com",
  messagingSenderId: "590231004212",
  appId: "1:590231004212:web:67215b3e43f9f0bef1d661"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const firestore = getFirestore();
export const storage = getStorage(app);
