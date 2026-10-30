import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db, auth } from "../core/config/firebase.js";
const records = collection(db, "sales");
const uid = () => {
  if (!auth.currentUser?.uid) throw new Error("Sign in to access sales records.");
  return auth.currentUser.uid;
};
export async function saveSaleCloud(record) {
  return addDoc(records, { ...record, userId: uid(), syncStatus: "SYNCED" });
}
export async function getSalesCloud() {
  const snapshot = await getDocs(query(records, where("userId", "==", uid())));
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.data().id || doc.id, cloudId: doc.id, syncStatus: "SYNCED" }));
}
export async function deleteSaleCloud(id) {
  const snapshot = await getDocs(query(records, where("userId", "==", uid()), where("id", "==", id)));
  await Promise.all(snapshot.docs.map(doc => deleteDoc(doc.ref)));
}
