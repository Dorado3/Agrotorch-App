/*
----------------------------------------------------
AgroTorch AgriOS
Activity Storage Service
Version 1.0.0
----------------------------------------------------
*/

const STORAGE_KEY = "agrotorch_activities";

export function getActivities() {

    const activities = localStorage.getItem(STORAGE_KEY);

    return activities ? JSON.parse(activities) : [];

}

export function saveActivity(activity) {

    const activities = getActivities();

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

    const activities = getActivities();

    activities.splice(index, 1);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(activities)
    );

}