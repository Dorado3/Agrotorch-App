/*
----------------------------------------------------
AgroTorch Intelligence
Irrigation Service
Version 1.0.0
----------------------------------------------------
*/

import { createIrrigationPlan } from "./irrigation.model.js";

export function buildIrrigationPlan(data = {}) {

    return createIrrigationPlan(data);

}

export function recommendIrrigation(weather) {

    if (weather.rainfall >= 5) {

        return {

            irrigationRequired: false,

            recommendation:

                "Rainfall is sufficient. Irrigation is not recommended today."

        };

    }

    return {

        irrigationRequired: true,

        recommendation:

            "Irrigate early morning or late evening to reduce evaporation losses."

    };

}
