import { getCurrentUserId } from "./userService.js";

const STORAGE_KEY = "agrotorch_harvests";

export function getHarvests() {

    const harvests =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId = getCurrentUserId();

    return harvests.filter(harvest => harvest.userId === userId);

}

export function saveHarvest(harvest) {

    const harvests =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    harvest.id = Date.now();

    harvest.userId = getCurrentUserId();

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
        harvests.filter(harvest => {

            return !(
                harvest.id === id &&
                harvest.userId === getCurrentUserId()
            );

        });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );

}

export function clearHarvests() {

    localStorage.removeItem(STORAGE_KEY);

}
