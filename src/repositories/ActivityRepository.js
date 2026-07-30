/*
----------------------------------------------------
AgroTorch Repository
Activity Repository
Version 3.0.0
----------------------------------------------------
*/

import {

    getActivities,

    saveActivity,

    getFarmActivities,

    deleteActivity

} from "../services/activityStorage.js";

import {

    saveActivityCloud,

    getActivitiesCloud,

    getFarmActivitiesCloud

} from "../firestore/ActivityFirestore.js";

export const ActivityRepository = {

    all() {

        return getActivities();

    },

    async allCloud() {

        return await getActivitiesCloud();

    },

    async create(activity) {

        saveActivity(activity);

        return await saveActivityCloud(activity);

    },

    farmActivities(farmId) {

        return getFarmActivities(farmId);

    },

    async farmActivitiesCloud(farmId) {

        return await getFarmActivitiesCloud(farmId);

    },

    delete(id) {

        return deleteActivity(id);

    }

};
