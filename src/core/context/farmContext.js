/*
----------------------------------------------------
AgroTorch Farm Context Engine
Version 1.0.0
----------------------------------------------------
*/

let activeFarm = null;

export function setActiveFarm(farm) {

    activeFarm = farm;

    localStorage.setItem(
        "agrotorch_active_farm",
        JSON.stringify(farm)
    );

}

export function getActiveFarm() {

    if (activeFarm) {

        return activeFarm;

    }

    const stored = localStorage.getItem(
        "agrotorch_active_farm"
    );

    if (stored) {

        activeFarm = JSON.parse(stored);

    }

    return activeFarm;

}

export function clearActiveFarm() {

    activeFarm = null;

    localStorage.removeItem(
        "agrotorch_active_farm"
    );

}
