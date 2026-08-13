/*
----------------------------------------------------
AgroTorch Pepper Mission
Version 1.0.0
----------------------------------------------------
*/

import { pepperKnowledge } from "../vault/pepper.js";
import { getGrowthStage } from "../../calendar/growthStage.js";

export function getPepperMission(farm, week) {

    const stage =
        getGrowthStage("Pepper", week)
            .toLowerCase();

    return pepperKnowledge.stages[stage] || null;

}
