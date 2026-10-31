import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";
import { db, auth } from "../core/config/firebase.js";

const farmsCollection = collection(db, "farms");

function assertOwner(ownerId) {
  const uid = auth.currentUser?.uid;
  if (!uid || uid !== ownerId) {
    throw new Error("You can only access farms belonging to your signed-in account.");
  }
}

export async function createFarm(ownerId, farm) {
  assertOwner(ownerId);
  return addDoc(farmsCollection, {
    ownerId,
    farmName: farm.farmName || "",
    ownerName: farm.ownerName || "",
    state: farm.state || "",
    lga: farm.lga || "",
    crop: farm.crop || "",
    cropId: farm.cropId || "",
    variety: farm.variety || "",
    productionMethod: farm.productionMethod || "Direct",
    nurseryDate: farm.nurseryDate || "",
    transplantDate: farm.transplantDate || "",
    plantingDate: farm.plantingDate || "",
    size: Number(farm.size || 0),
    location: farm.location || "",
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function getUserFarms(ownerId) {
  assertOwner(ownerId);
  const snapshot = await getDocs(query(farmsCollection, where("ownerId", "==", ownerId)));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/*
 * Keep the legacy "all" helper owner-scoped. Admin-wide access must use
 * a separately authorized server-side role check, not a client collection scan.
 */
export async function getAllFarms() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Sign in to access farms.");
  return getUserFarms(uid);
}
