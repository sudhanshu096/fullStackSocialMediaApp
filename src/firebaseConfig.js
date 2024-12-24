// Import the functions you need from the SDKs you need


import {getReactNativePersistence, initializeAuth} from 'firebase/auth'

import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMvX4sz_9xNzgGRFBrW5Y4mZojaP1nz3g",
  authDomain: "fir-chat-app-212ce.firebaseapp.com",
  projectId: "fir-chat-app-212ce",
  storageBucket: "fir-chat-app-212ce.firebasestorage.app",
  messagingSenderId: "1018248873242",
  appId: "1:1018248873242:web:dec9c0b3513a5c8e5818a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db,'users');
export const roomsRef = collection(db,'rooms');