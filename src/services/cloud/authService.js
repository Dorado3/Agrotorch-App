/*
----------------------------------------------------
AgroTorch Authentication Service
Version 1.0.0
----------------------------------------------------
*/

import { CLOUD } from "./config.js";

export async function login(email, password) {

    if (CLOUD.provider !== "firebase") {

        throw new Error("Unsupported authentication provider.");

    }

    throw new Error("Firebase Authentication not configured yet.");

}

export async function register(name, email, password) {

    if (CLOUD.provider !== "firebase") {

        throw new Error("Unsupported authentication provider.");

    }

    throw new Error("Firebase Authentication not configured yet.");

}

export async function logout() {

    if (CLOUD.provider !== "firebase") {

        throw new Error("Unsupported authentication provider.");

    }

    throw new Error("Firebase Authentication not configured yet.");

}
