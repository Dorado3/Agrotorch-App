/*
----------------------------------------------------
AgroTorch Repository
Harvest Repository
Version 3.0.0
----------------------------------------------------
*/

import {

    getHarvests,

    getFarmHarvests,

    saveHarvest,

    deleteHarvest

} from "../services/harvestStorage.js";

import {

    saveHarvestCloud,

    getHarvestsCloud

} from "../firestore/HarvestFirestore.js";

export const HarvestRepository = {

    all() {

        return getHarvests();

    },

    farmHarvests(farmId) {

        return getFarmHarvests(farmId);

    },

    async allCloud() {

        return await getHarvestsCloud();

    },

    async create(harvest) {

        saveHarvest(harvest);

        return await saveHarvestCloud(harvest);

    },

    delete(id) {

        return deleteHarvest(id);

    }

};
