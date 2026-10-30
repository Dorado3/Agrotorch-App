import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db, auth } from "../core/config/firebase.js";

const activitiesCollection = collection(db, "activities");
function currentUid() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Sign in to access farm activities.");
  return uid;
}

export async function saveActivityCloud(activity) {
  const uid = currentUid();
  return addDoc(activitiesCollection, { ...activity, userId: uid });
}

export async function getActivitiesCloud() {
  const uid = currentUid();
  const snapshot = await getDocs(query(activitiesCollection, where("userId", "==", uid)));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return { ...data, id: data.id || doc.id, cloudId: doc.id };
  });
}

export async function getFarmActivitiesCloud(farmId) {
  const uid = currentUid();
  const q = query(activitiesCollection, where("userId", "==", uid), where("farmId", "==", farmId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return { ...data, id: data.id || doc.id, cloudId: doc.id };
  });
}

export async function deleteActivityCloud(id) {
  const uid = currentUid();
  const q = query(activitiesCollection, where("userId", "==", uid), where("id", "==", id));
  const snapshot = await getDocs(q);
  await Promise.all(snapshot.docs.map(item => deleteDoc(item.ref)));
}
