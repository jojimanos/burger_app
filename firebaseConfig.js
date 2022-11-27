// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJszxOZmgEloIJlxk9sHEPIw0uF30OpBs",
  authDomain: "burgerapp-750a2.firebaseapp.com",
  projectId: "burgerapp-750a2",
  storageBucket: "burgerapp-750a2.appspot.com",
  messagingSenderId: "724498090374",
  appId: "1:724498090374:web:770c2a170747c24fb14407",
  measurementId: "G-TG02JWPE70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);