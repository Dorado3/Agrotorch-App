/*
----------------------------------------------------
AgroTorch Database Service
Version 1.0.0
----------------------------------------------------
*/

import { CLOUD } from "./config.js";

export async function save(collection, data) {

    if (CLOUD.provider !== "firebase") {

        throw new Error("Unsupported database provider.");

    }

    throw new Error("Firebase not configured yet.");

}

export async function fetch(collection) {

    if (CLOUD.provider !== "firebase") {

        throw new Error("Unsupported database provider.");

    }

    throw new Error("Firebase not configured yet.");

}

export async function update(collection, id, data) {

    if (CLOUD.provider !== "firebase") {

        throw new Error("Unsupported database provider.");

    }

    throw new Error("Firebase not configured yet.");

}

export async function remove(collection, id) {

    if (CLOUD.provider !== "firebase") {

        throw new Error("Unsupported database provider.");

    }

    throw new Error("Firebase not configured yet.");

}
