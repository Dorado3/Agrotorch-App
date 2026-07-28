/*
----------------------------------------------------
AgroTorch Repository
Harvest Repository
Version 2.0.0
----------------------------------------------------
*/

import {

    getHarvests,

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
