/*
----------------------------------------------------
AgroTorch AgriOS
Activity Storage Service
Version 2.0.0
----------------------------------------------------
*/

import { getCurrentUserId } from "./userService.js";

const STORAGE_KEY = "agrotorch_activities";

export function getActivities() {

    const activities =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId = getCurrentUserId();

    return activities.filter(activity => activity.userId === userId);

}

export function saveActivity(activity) {

    const activities =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    activity.userId = getCurrentUserId();

    activities.push(activity);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(activities)
    );

}

export function getFarmActivities(farmName) {

    return getActivities().filter(activity =>
        activity.farmName === farmName
    );

}

export function deleteActivity(index) {

    const activities =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId = getCurrentUserId();

    const myActivities =
        activities.filter(activity => activity.userId === userId);

    const activityToDelete = myActivities[index];

    const updated =
        activities.filter(activity => activity !== activityToDelete);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );

}
