/*
----------------------------------------------------
AgroTorch Repository
Activity Repository
Version 2.0.0
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

    create(activity) {

        saveActivity(activity);

        return saveActivityCloud(activity);

    },

    farmActivities(farmName) {

        return getFarmActivities(farmName);

    },

    async farmActivitiesCloud(farmName) {

        return await getFarmActivitiesCloud(farmName);

    },

    delete(index) {

        return deleteActivity(index);

    }

};
