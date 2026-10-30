import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db, auth } from "../core/config/firebase.js";

const expensesCollection = collection(db, "expenses");
function currentUid() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Sign in to access farm expenses.");
  return uid;
}

export async function saveExpenseCloud(expense) {
  return addDoc(expensesCollection, { ...expense, userId: currentUid() });
}

export async function getExpensesCloud() {
  const snapshot = await getDocs(query(expensesCollection, where("userId", "==", currentUid())));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return { ...data, id: data.id || doc.id, cloudId: doc.id };
  });
}

export async function deleteExpenseCloud(id) {
  const q = query(expensesCollection, where("userId", "==", currentUid()), where("id", "==", id));
  const snapshot = await getDocs(q);
  await Promise.all(snapshot.docs.map(item => deleteDoc(item.ref)));
}
