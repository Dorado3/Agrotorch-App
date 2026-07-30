/*
----------------------------------------------------
AgroTorch Activity Storage
Version 3.0.0
----------------------------------------------------
*/

import { getCurrentUserId } from "./userService.js";

const STORAGE_KEY = "agrotorch_activities";

export function getActivities() {

    const activities =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId =
        getCurrentUserId();

    return activities.filter(activity =>
        activity.userId === userId
    );

}

export function getFarmActivities(farmId) {

    return getActivities().filter(activity =>
        activity.farmId === farmId
    );

}

export function saveActivity(activity) {

    const activities =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    activity.id =
        crypto.randomUUID();

    activity.userId =
        getCurrentUserId();

    activity.createdAt =
        new Date().toISOString();

    activity.updatedAt =
        new Date().toISOString();

    activities.push(activity);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(activities)
    );

}

export function deleteActivity(id) {

    const activities =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const updated =
        activities.filter(activity =>
            activity.id !== id
        );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );

}

export function clearActivities() {

    localStorage.removeItem(STORAGE_KEY);

}
