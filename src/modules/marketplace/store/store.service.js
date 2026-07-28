/*
----------------------------------------------------
AgroTorch Marketplace
Store Service
Version 1.0.0
----------------------------------------------------
*/

import { createStore } from "./store.model.js";

import { validateStore } from "./store.validator.js";

export function buildStore(data = {}) {

    const store = createStore(data);

    validateStore(store);

    return store;

}
