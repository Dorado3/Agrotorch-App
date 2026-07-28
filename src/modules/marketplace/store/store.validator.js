/*
----------------------------------------------------
AgroTorch Marketplace
Store Validator
Version 1.0.0
----------------------------------------------------
*/

export function validateStore(store) {

    if (!store.storeName) {

        throw new Error("Store name is required.");

    }

    if (!store.ownerId) {

        throw new Error("Owner ID is required.");

    }

    return true;

}
