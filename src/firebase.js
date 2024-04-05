// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnCXt7bZu_Sm1wmGbVXINt_bKVJIrEW9c",
  authDomain: "chat-application-react-e83cd.firebaseapp.com",
  projectId: "chat-application-react-e83cd",
  storageBucket: "chat-application-react-e83cd.appspot.com",
  messagingSenderId: "896070934878",
  appId: "1:896070934878:web:c989916933e07e7f28efcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
