/*
----------------------------------------------------
AgroTorch Harvest Storage
Version 3.0.0
----------------------------------------------------
*/

import { getCurrentUserId } from "./userService.js";

const STORAGE_KEY = "agrotorch_harvests";

export function getHarvests() {

    const harvests =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId =
        getCurrentUserId();

    return harvests.filter(harvest =>
        harvest.userId === userId
    );

}

export function getFarmHarvests(farmId) {

    return getHarvests().filter(harvest =>
        harvest.farmId === farmId
    );

}

export function saveHarvest(harvest) {

    const harvests =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    harvest.id =
        crypto.randomUUID();

    harvest.userId =
        getCurrentUserId();

    harvest.createdAt =
        new Date().toISOString();

    harvest.updatedAt =
        new Date().toISOString();

    harvests.push(harvest);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(harvests)
    );

}

export function deleteHarvest(id) {

    const harvests =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const updated =
        harvests.filter(harvest =>
            harvest.id !== id
        );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );

}

export function clearHarvests() {

    localStorage.removeItem(STORAGE_KEY);

}
