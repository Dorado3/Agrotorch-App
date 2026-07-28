/*
----------------------------------------------------
AgroTorch Marketplace
Store Controller
Version 1.0.0
----------------------------------------------------
*/

import { StoreRepository } from "./store.repository.js";

export const StoreController = {

    async createStore(data) {

        return await StoreRepository.createCloud(data);

    },

    async getStores() {

        return await StoreRepository.allCloud();

    },

    async getStore(id) {

        return await StoreRepository.findCloud(id);

    },

    async updateStore(id, updates) {

        return await StoreRepository.updateCloud(

            id,

            updates

        );

    },

    async deleteStore(id) {

        return await StoreRepository.deleteCloud(id);

    }

};
