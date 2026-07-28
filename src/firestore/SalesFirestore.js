/*
----------------------------------------------------
AgroTorch Firestore
Sales Service
Version 1.0.0
----------------------------------------------------
*/

import {

    collection,

    addDoc,

    getDocs

} from "firebase/firestore";

import { db } from "../core/config/firebase.js";

const salesCollection = collection(db, "sales");

export async function saveSaleCloud(sale) {

    return await addDoc(

        salesCollection,

        sale

    );

}

export async function getSalesCloud() {

    const snapshot = await getDocs(

        salesCollection

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}
