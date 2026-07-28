/*
----------------------------------------------------
AgroTorch Intelligence
Growth Stage Service
Version 1.0.0
----------------------------------------------------
*/

import { createGrowthStage } from "./growthStage.model.js";

export function buildGrowthStage(data = {}) {

    return createGrowthStage(data);

}

export function determineTomatoStage(daysAfterPlanting) {

    if (daysAfterPlanting <= 14) {

        return "seedling";

    }

    if (daysAfterPlanting <= 35) {

        return "vegetative";

    }

    if (daysAfterPlanting <= 60) {

        return "flowering";

    }

    if (daysAfterPlanting <= 90) {

        return "fruiting";

    }

    return "harvest";

}
