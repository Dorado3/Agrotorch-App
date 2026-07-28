/*
----------------------------------------------------
AgroTorch Firestore
Farm Service
Version 1.0.0
----------------------------------------------------
*/

import {

    collection,

    addDoc,

    getDocs

} from "firebase/firestore";

import { db } from "../core/config/firebase.js";

const farmsCollection = collection(db, "farms");

export async function saveFarmCloud(farm) {

    return await addDoc(farmsCollection, farm);

}

export async function getFarmsCloud() {

    const snapshot = await getDocs(farmsCollection);

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}
