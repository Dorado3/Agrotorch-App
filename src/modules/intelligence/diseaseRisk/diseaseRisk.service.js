/*
----------------------------------------------------
AgroTorch Intelligence
Disease Risk Service
Version 1.0.0
----------------------------------------------------
*/

import { createDiseaseRisk } from "./diseaseRisk.model.js";

export function buildDiseaseRisk(data = {}) {

    return createDiseaseRisk(data);

}

export function estimateTomatoDiseaseRisk(weather) {

    if (

        weather.humidity > 85 &&

        weather.rainfall > 5

    ) {

        return {

            riskLevel: "high",

            recommendation:

                "High fungal disease risk. Consider preventive fungicide application."

        };

    }

    return {

        riskLevel: "low",

        recommendation:

            "Disease pressure currently low."

    };

}
