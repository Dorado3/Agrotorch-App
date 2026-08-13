/*
----------------------------------------------------
AgroTorch Mission Registry
Version 2.0.0
----------------------------------------------------
*/

import { getTomatoMission } from "./tomatoMission.js";

const missionRegistry = {

    tomato: getTomatoMission

};

export function getCropMission(farm, week) {

    const crop =
        (farm.crop || "").toLowerCase();

    const resolver =
        missionRegistry[crop];

    if (!resolver) {

        return null;

    }

    return resolver(farm, week);

}
