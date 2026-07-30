/*
----------------------------------------------------
AgroTorch Repository
Harvest Repository
Version 3.1.0
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

import { isToday } from "../core/date/isToday.js";

export const HarvestRepository = {

    all() {

        return getHarvests();

    },

    farmHarvests(farmId) {

        return getFarmHarvests(farmId);

    },

    todayHarvests(farmId) {

        return getFarmHarvests(farmId)

            .filter(harvest =>

                isToday(

                    harvest.createdAt ||

                    harvest.date ||

                    harvest.timestamp

                )

            );

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
