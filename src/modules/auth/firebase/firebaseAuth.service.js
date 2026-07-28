/*
----------------------------------------------------
AgroTorch Firebase Authentication
Version 1.1.0
----------------------------------------------------
*/

import {

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword,

  signOut,

  sendPasswordResetEmail,

  onAuthStateChanged

} from "firebase/auth";

import { auth } from "../../../core/config/firebase.js";

import { createUserProfile } from "../../../firestore/users/UserFirestore.js";


export async function register(email, password, fullName = "") {

  const credential = await createUserWithEmailAndPassword(

    auth,

    email,

    password

  );

  await createUserProfile(credential.user.uid, {

    fullName,

    email,

    role: "farmer",

    status: "active",

    onboardingCompleted: false

  });

  return credential;

}


export async function login(email, password) {

  return signInWithEmailAndPassword(

    auth,

    email,

    password

  );

}


export async function logout() {

  return signOut(auth);

}


export async function resetPassword(email) {

  return sendPasswordResetEmail(

    auth,

    email

  );

}


export function authListener(callback) {

  return onAuthStateChanged(

    auth,

    callback

  );

}
