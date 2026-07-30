/*
----------------------------------------------------
AgroTorch Repository
Activity Repository
Version 3.1.0
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

import { isToday } from "../core/date/isToday.js";

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

    todayActivities(farmId) {

        return getFarmActivities(farmId)

            .filter(activity =>

                isToday(

                    activity.createdAt ||

                    activity.date ||

                    activity.timestamp

                )

            );

    },

    async farmActivitiesCloud(farmId) {

        return await getFarmActivitiesCloud(farmId);

    },

    delete(id) {

        return deleteActivity(id);

    }

};
