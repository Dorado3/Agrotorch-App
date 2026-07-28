/*
----------------------------------------------------
AgroTorch Marketplace
Order Firestore
Version 1.0.0
----------------------------------------------------
*/

import {

    collection,

    addDoc,

    getDocs,

    getDoc,

    updateDoc,

    deleteDoc,

    doc

} from "firebase/firestore";

import { db } from "../../../core/config/firebase.js";

const COLLECTION = "orders";

export async function createOrderCloud(order) {

    const result = await addDoc(

        collection(db, COLLECTION),

        order

    );

    return result.id;

}

export async function getOrdersCloud() {

    const snapshot = await getDocs(

        collection(db, COLLECTION)

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

export async function getOrderCloud(id) {

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

export async function updateOrderCloud(id, updates) {

    await updateDoc(

        doc(db, COLLECTION, id),

        updates

    );

}

export async function deleteOrderCloud(id) {

    await deleteDoc(

        doc(db, COLLECTION, id)

    );

}
