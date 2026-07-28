/*
----------------------------------------------------
AgroTorch Repository
Farm Repository
Version 3.0.0
----------------------------------------------------
*/

import {

    getFarms,

    saveFarm,

    updateFarm,

    deleteFarm

} from "../services/farmStorage.js";

import {

    createFarm,

    getUserFarms,

    getAllFarms

} from "../firestore/FarmFirestore.js";

export const FarmRepository = {

    all() {

        return getFarms();

    },

    async allCloud() {

        return await getAllFarms();

    },

    async userFarms(ownerId) {

        return await getUserFarms(ownerId);

    },

    async create(ownerId, farm) {

        saveFarm(farm);

        return await createFarm(ownerId, farm);

    },

    update(index, farm) {

        return updateFarm(index, farm);

    },

    delete(index) {

        return deleteFarm(index);

    }

};
