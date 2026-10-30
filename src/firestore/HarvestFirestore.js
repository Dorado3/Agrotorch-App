import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db, auth } from "../core/config/firebase.js";

const harvestsCollection = collection(db, "harvests");
function currentUid() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Sign in to access harvest records.");
  return uid;
}

export async function saveHarvestCloud(harvest) {
  return addDoc(harvestsCollection, { ...harvest, userId: currentUid() });
}

export async function getHarvestsCloud() {
  const snapshot = await getDocs(query(harvestsCollection, where("userId", "==", currentUid())));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return { ...data, id: data.id || doc.id, cloudId: doc.id };
  });
}

export async function deleteHarvestCloud(id) {
  const q = query(harvestsCollection, where("userId", "==", currentUid()), where("id", "==", id));
  const snapshot = await getDocs(q);
  await Promise.all(snapshot.docs.map(item => deleteDoc(item.ref)));
}
