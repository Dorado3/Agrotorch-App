/*
----------------------------------------------------
AgroTorch Firestore
Farm Service
Version 2.0.0
----------------------------------------------------
*/

import {

    collection,

    addDoc,

    getDocs,

    query,

    where,

    serverTimestamp

} from "firebase/firestore";

import { db } from "../core/config/firebase.js";

const farmsCollection = collection(db, "farms");


export async function createFarm(ownerId, farm) {

    return await addDoc(farmsCollection, {

        ownerId,

        farmName: farm.farmName || "",

        crop: farm.crop || "",

        location: farm.location || "",

        size: farm.size || "",

        status: "active",

        createdAt: serverTimestamp(),

        updatedAt: serverTimestamp()

    });

}


export async function getUserFarms(ownerId) {

    const q = query(

        farmsCollection,

        where("ownerId", "==", ownerId)

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}


export async function getAllFarms() {

    const snapshot = await getDocs(farmsCollection);

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}
