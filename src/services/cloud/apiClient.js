/*
----------------------------------------------------
AgroTorch API Client
Version 1.0.0
----------------------------------------------------
*/

import { CLOUD } from "./config.js";

export async function apiGet(endpoint) {

    return fetch(`${CLOUD.apiBaseUrl}${endpoint}`);

}

export async function apiPost(endpoint, data) {

    return fetch(`${CLOUD.apiBaseUrl}${endpoint}`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(data)

    });

}
