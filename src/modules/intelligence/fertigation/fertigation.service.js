/*
----------------------------------------------------
AgroTorch Intelligence
Fertigation Service
Version 1.0.0
----------------------------------------------------
*/

import { createFertigationPlan } from "./fertigation.model.js";

export function buildFertigationPlan(data = {}) {

    return createFertigationPlan(data);

}

export function recommendTomatoFertigation(stage) {

    switch(stage) {

        case "seedling":

            return "Use MAP to encourage root establishment.";

        case "vegetative":

            return "Apply balanced NPK to support vigorous vegetative growth.";

        case "flowering":

            return "Increase calcium and potassium. Avoid excessive nitrogen.";

        case "fruiting":

            return "Prioritise potassium and calcium for fruit size and quality.";

        case "harvest":

            return "Maintain balanced nutrition while preparing for final harvest.";

        default:

            return "No recommendation available.";

    }

}
