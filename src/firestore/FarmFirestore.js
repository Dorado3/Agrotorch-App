/*
----------------------------------------------------
AgroTorch Firestore
Farm Service
Version 3.0.0
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

const farmsCollection =
    collection(db, "farms");

export async function createFarm(ownerId, farm) {

    return await addDoc(farmsCollection, {

        ownerId,

        farmName:
            farm.farmName || "",

        ownerName:
            farm.ownerName || "",

        state:
            farm.state || "",

        lga:
            farm.lga || "",

        crop:
            farm.crop || "",

        cropId:
            farm.cropId || "",

        variety:
            farm.variety || "",

        productionMethod:
            farm.productionMethod || "Direct",

        nurseryDate:
            farm.nurseryDate || "",

        transplantDate:
            farm.transplantDate || "",

        plantingDate:
            farm.plantingDate || "",

        size:
            farm.size || 0,

        location:
            farm.location || "",

        status:
            "active",

        createdAt:
            serverTimestamp(),

        updatedAt:
            serverTimestamp()

    });

}

export async function getUserFarms(ownerId) {

    const q = query(

        farmsCollection,

        where("ownerId","==",ownerId)

    );

    const snapshot =
        await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

export async function getAllFarms(){

    const snapshot =
        await getDocs(farmsCollection);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}
