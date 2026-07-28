/*
----------------------------------------------------
AgroTorch Firestore
User Repository
Version 1.0.0
----------------------------------------------------
*/

import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "../../core/config/firebase.js";

const USERS = collection(db, "users");

export async function createUserProfile(uid, data) {

  await setDoc(doc(USERS, uid), {

    ...data,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString()

  });

}

export async function getUserProfile(uid) {

  const snapshot = await getDoc(doc(USERS, uid));

  if (!snapshot.exists()) {

    return null;

  }

  return {

    id: snapshot.id,

    ...snapshot.data()

  };

}

export async function updateUserProfile(uid, updates) {

  await updateDoc(

    doc(USERS, uid),

    {

      ...updates,

      updatedAt: new Date().toISOString()

    }

  );

}
