// Import the functions you need from the SDKs you need


import {getReactNativePersistence, initializeAuth} from 'firebase/auth'

import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNkTuzuWIvNmohQm_hC_4YOOT00nnczY0",
  authDomain: "fir-chat-app-b6723.firebaseapp.com",
  projectId: "fir-chat-app-b6723",
  storageBucket: "fir-chat-app-b6723.firebasestorage.app",
  messagingSenderId: "900524593871",
  appId: "1:900524593871:web:699f4a196a43a6bca89dba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db,'users');
export const roomsRef = collection(db,'rooms');