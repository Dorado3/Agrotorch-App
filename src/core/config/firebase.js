/*
----------------------------------------------------
AgroTorch Firebase Configuration
Version 2.0.0
----------------------------------------------------
*/

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyBtLGzdFpCUL7737j3kviA3mqDS0zT_Dq8",

    authDomain: "greenmarket-d3ffc.firebaseapp.com",

    projectId: "greenmarket-d3ffc",

    storageBucket: "greenmarket-d3ffc.firebasestorage.app",

    messagingSenderId: "295513099994",

    appId: "1:295513099994:web:1053926abac23592e91fe3"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
