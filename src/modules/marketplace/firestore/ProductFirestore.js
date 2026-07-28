/*
----------------------------------------------------
AgroTorch Marketplace
Product Firestore
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

const COLLECTION = "products";

export async function createProductCloud(product) {

    const result = await addDoc(

        collection(db, COLLECTION),

        product

    );

    return result.id;

}

export async function getProductsCloud() {

    const snapshot = await getDocs(

        collection(db, COLLECTION)

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

export async function getProductCloud(id) {

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

export async function updateProductCloud(id, updates) {

    await updateDoc(

        doc(db, COLLECTION, id),

        updates

    );

}

export async function deleteProductCloud(id) {

    await deleteDoc(

        doc(db, COLLECTION, id)

    );

}
