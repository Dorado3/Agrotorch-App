const STORAGE_KEY = "agrotorch_harvests";

export function getHarvests() {

    const harvests = localStorage.getItem(STORAGE_KEY);

    return harvests ? JSON.parse(harvests) : [];

}

export function saveHarvest(harvest) {

    const harvests = getHarvests();

    harvest.id = Date.now();

    harvests.push(harvest);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(harvests)
    );

}

export function deleteHarvest(id) {

    const harvests = getHarvests().filter(
        harvest => harvest.id !== id
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(harvests)
    );

}

export function clearHarvests() {

    localStorage.removeItem(STORAGE_KEY);

}