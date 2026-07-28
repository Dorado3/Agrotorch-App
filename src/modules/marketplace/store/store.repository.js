/*
----------------------------------------------------
AgroTorch Marketplace
Store Repository
Version 2.0.0
----------------------------------------------------
*/

import { buildStore } from "./store.service.js";

import {

    createStoreCloud,

    getStoresCloud,

    getStoreCloud,

    updateStoreCloud,

    deleteStoreCloud

} from "../firestore/StoreFirestore.js";

const stores = [];

export const StoreRepository = {

    createLocal(data) {

        const store = buildStore(data);

        stores.push(store);

        return store;

    },

    allLocal() {

        return stores;

    },

    findLocal(id) {

        return stores.find(store => store.id === id);

    },

    async createCloud(data) {

        const store = buildStore(data);

        return await createStoreCloud(store);

    },

    async allCloud() {

        return await getStoresCloud();

    },

    async findCloud(id) {

        return await getStoreCloud(id);

    },

    async updateCloud(id, updates) {

        return await updateStoreCloud(id, updates);

    },

    async deleteCloud(id) {

        return await deleteStoreCloud(id);

    }

};
