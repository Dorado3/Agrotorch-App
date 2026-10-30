import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../core/config/firebase.js";

const tasksCollection = collection(db, "tasks");
function currentUid() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Sign in to sync farm tasks.");
  return uid;
}

export async function saveTaskCloud(task) {
  const uid = currentUid();
  if (!task?.id) throw new Error("A stable task ID is required.");
  const reference = doc(db, "tasks", task.id);
  await setDoc(reference, { ...task, userId: uid, syncStatus: "SYNCED" }, { merge: true });
  return reference;
}

export async function getTasksCloud() {
  const snapshot = await getDocs(query(tasksCollection, where("userId", "==", currentUid())));
  return snapshot.docs.map(item => ({ ...item.data(), id: item.id, cloudId: item.id, syncStatus: "SYNCED" }));
}
