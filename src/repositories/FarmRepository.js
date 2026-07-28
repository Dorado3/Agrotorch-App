/*
----------------------------------------------------
AgroTorch Repository
Farm Repository
Version 2.0.0
----------------------------------------------------
*/

import {

    getFarms,

    saveFarm,

    updateFarm,

    deleteFarm

} from "../services/farmStorage.js";

import {

    saveFarmCloud,

    getFarmsCloud

} from "../firestore/FarmFirestore.js";

export const FarmRepository = {

    all() {

        return getFarms();

    },

    async allCloud() {

        return await getFarmsCloud();

    },

    async create(farm) {

        saveFarm(farm);

        return await saveFarmCloud(farm);

    },

    update(index, farm) {

        return updateFarm(index, farm);

    },

    delete(index) {

        return deleteFarm(index);

    }

};
