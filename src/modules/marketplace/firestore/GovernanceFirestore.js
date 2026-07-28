/*
----------------------------------------------------
AgroTorch Marketplace
Governance Firestore
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

const COLLECTION = "governance";

export async function createRuleCloud(rule) {

    const result = await addDoc(

        collection(db, COLLECTION),

        rule

    );

    return result.id;

}

export async function getRulesCloud() {

    const snapshot = await getDocs(

        collection(db, COLLECTION)

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

export async function getRuleCloud(id) {

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

export async function updateRuleCloud(id, updates) {

    await updateDoc(

        doc(db, COLLECTION, id),

        updates

    );

}

export async function deleteRuleCloud(id) {

    await deleteDoc(

        doc(db, COLLECTION, id)

    );

}
