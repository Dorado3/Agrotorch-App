/*
----------------------------------------------------
AgroTorch Firestore
Activity Service
Version 1.0.0
----------------------------------------------------
*/

import {

    collection,

    addDoc,

    getDocs,

    query,

    where

} from "firebase/firestore";

import { db } from "../core/config/firebase.js";

const activitiesCollection = collection(db, "activities");

export async function saveActivityCloud(activity) {

    return await addDoc(

        activitiesCollection,

        activity

    );

}

export async function getActivitiesCloud() {

    const snapshot = await getDocs(

        activitiesCollection

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

export async function getFarmActivitiesCloud(farmName) {

    const q = query(

        activitiesCollection,

        where("farmName", "==", farmName)

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}
