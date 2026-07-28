/*
----------------------------------------------------
AgroTorch Marketplace
Cart Firestore
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

const COLLECTION = "carts";

export async function createCartCloud(cart) {

    const result = await addDoc(

        collection(db, COLLECTION),

        cart

    );

    return result.id;

}

export async function getCartsCloud() {

    const snapshot = await getDocs(

        collection(db, COLLECTION)

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

export async function getCartCloud(id) {

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

export async function updateCartCloud(id, updates) {

    await updateDoc(

        doc(db, COLLECTION, id),

        updates

    );

}

export async function deleteCartCloud(id) {

    await deleteDoc(

        doc(db, COLLECTION, id)

    );

}
