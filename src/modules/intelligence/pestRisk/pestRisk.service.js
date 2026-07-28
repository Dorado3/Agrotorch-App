/*
----------------------------------------------------
AgroTorch Intelligence
Pest Risk Service
Version 1.0.0
----------------------------------------------------
*/

import { createPestRisk } from "./pestRisk.model.js";

export function buildPestRisk(data = {}) {

    return createPestRisk(data);

}

export function estimateTomatoPestRisk(weather) {

    if (

        weather.temperature >= 28 &&

        weather.humidity >= 70

    ) {

        return {

            riskLevel: "high",

            recommendation:

                "High risk of whiteflies and thrips. Increase field scouting and prepare appropriate control measures."

        };

    }

    return {

        riskLevel: "low",

        recommendation:

            "Pest pressure currently low."

    };

}
