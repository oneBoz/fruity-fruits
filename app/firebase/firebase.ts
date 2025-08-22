// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBe8y18fkDOhdAPE7SsbkdOcOkCPz1_QY",
    authDomain: "fruity-fruits-fb1bc.firebaseapp.com",
    projectId: "fruity-fruits-fb1bc",
    storageBucket: "fruity-fruits-fb1bc.firebasestorage.app",
    messagingSenderId: "1044915732707",
    appId: "1:1044915732707:web:fee746e5cc4ec773fbc5d6",
    measurementId: "G-SLG9DBYQB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };