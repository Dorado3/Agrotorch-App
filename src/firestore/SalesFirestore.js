import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db, auth } from "../core/config/firebase.js";

const salesCollection = collection(db, "sales");
function currentUid() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Sign in to access sales records.");
  return uid;
}

export async function saveSaleCloud(sale) {
  return addDoc(salesCollection, { ...sale, userId: currentUid() });
}

export async function getSalesCloud() {
  const snapshot = await getDocs(query(salesCollection, where("userId", "==", currentUid())));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return { ...data, id: data.id || doc.id, cloudId: doc.id };
  });
}

export async function deleteSaleCloud(id) {
  const q = query(salesCollection, where("userId", "==", currentUid()), where("id", "==", id));
  const snapshot = await getDocs(q);
  await Promise.all(snapshot.docs.map(item => deleteDoc(item.ref)));
}
