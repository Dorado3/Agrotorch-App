/*
----------------------------------------------------
AgroTorch Marketplace
Store Firestore
Version 1.0.0
----------------------------------------------------
*/

import {

    collection,

    addDoc,

    getDocs,

    doc,

    getDoc,

    updateDoc,

    deleteDoc

} from "firebase/firestore";

import { db } from "../../../core/config/firebase.js";

const COLLECTION = "stores";

export async function createStoreCloud(store) {

    const result = await addDoc(

        collection(db, COLLECTION),

        store

    );

    return result.id;

}

export async function getStoresCloud() {

    const snapshot = await getDocs(

        collection(db, COLLECTION)

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

export async function getStoreCloud(id) {

    const snapshot = await getDoc(

        doc(db, COLLECTION, id)

    );

    if (!snapshot.exists()) {

        return null;

    }

    return {

        id: snapshot.id,

        ...snapshot.data()

    };

}

export async function updateStoreCloud(id, updates) {

    await updateDoc(

        doc(db, COLLECTION, id),

        updates

    );

}

export async function deleteStoreCloud(id) {

    await deleteDoc(

        doc(db, COLLECTION, id)

    );

}
