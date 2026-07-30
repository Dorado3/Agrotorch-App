/*
----------------------------------------------------
AgroTorch Mission Registry
Version 1.0.0
----------------------------------------------------
*/

import { getTomatoMission } from "./tomatoMission.js";

export function getCropMission(farm, week) {

    const crop =
        (farm.crop || "").toLowerCase();

    switch (crop) {

        case "tomato":

            return getTomatoMission(farm, week);

        default:

            return null;

    }

}
