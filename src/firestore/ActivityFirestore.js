import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db, auth } from "../core/config/firebase.js";
const records = collection(db, "activities");
const uid = () => {
  if (!auth.currentUser?.uid) throw new Error("Sign in to access farm activities.");
  return auth.currentUser.uid;
};
export async function saveActivityCloud(record) {
  return addDoc(records, { ...record, userId: uid(), syncStatus: "SYNCED" });
}
export async function getActivitiesCloud() {
  const snapshot = await getDocs(query(records, where("userId", "==", uid())));
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.data().id || doc.id, cloudId: doc.id, syncStatus: "SYNCED" }));
}
export async function getFarmActivitiesCloud(farmId) {
  const snapshot = await getDocs(query(records, where("userId", "==", uid()), where("farmId", "==", farmId)));
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.data().id || doc.id, cloudId: doc.id, syncStatus: "SYNCED" }));
}
export async function deleteActivityCloud(id) {
  const snapshot = await getDocs(query(records, where("userId", "==", uid()), where("id", "==", id)));
  await Promise.all(snapshot.docs.map(doc => deleteDoc(doc.ref)));
}
