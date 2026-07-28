/*
----------------------------------------------------
AgroTorch Firestore
Harvest Service
Version 1.0.0
----------------------------------------------------
*/

import {

    collection,

    addDoc,

    getDocs

} from "firebase/firestore";

import { db } from "../core/config/firebase.js";

const harvestsCollection = collection(db, "harvests");

export async function saveHarvestCloud(harvest) {

    return await addDoc(

        harvestsCollection,

        harvest

    );

}

export async function getHarvestsCloud() {

    const snapshot = await getDocs(

        harvestsCollection

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}
