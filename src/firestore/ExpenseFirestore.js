/*
----------------------------------------------------
AgroTorch Firestore
Expense Service
Version 1.0.0
----------------------------------------------------
*/

import {

    collection,

    addDoc,

    getDocs

} from "firebase/firestore";

import { db } from "../core/config/firebase.js";

const expensesCollection = collection(db, "expenses");

export async function saveExpenseCloud(expense) {

    return await addDoc(

        expensesCollection,

        expense

    );

}

export async function getExpensesCloud() {

    const snapshot = await getDocs(

        expensesCollection

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}
