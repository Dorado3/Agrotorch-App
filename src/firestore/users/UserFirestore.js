import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../core/config/firebase.js";

const USERS = "users";

function assertOwnProfile(uid) {
  if (!auth.currentUser?.uid || auth.currentUser.uid !== uid) {
    throw new Error("You can only access your own user profile.");
  }
}

export async function createUserProfile(uid, data) {
  assertOwnProfile(uid);
  await setDoc(doc(db, USERS, uid), {
    ...data,
    uid,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

export async function getUserProfile(uid) {
  assertOwnProfile(uid);
  const snapshot = await getDoc(doc(db, USERS, uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function updateUserProfile(uid, updates) {
  assertOwnProfile(uid);
  await updateDoc(doc(db, USERS, uid), {
    ...updates,
    updatedAt: new Date().toISOString()
  });
}
