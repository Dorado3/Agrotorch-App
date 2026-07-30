/*
----------------------------------------------------
AgroTorch Disease Risk Engine
Version 1.0.0
----------------------------------------------------
*/

export function evaluateDiseaseRisk(context) {

    let risk = "LOW";

    let reason =
        "No significant disease pressure detected.";

    const weather =
        context.weather;

    const stage =
        (context.stage || "").toLowerCase();

    if (
        weather.humidity >= 85 &&
        weather.rainfallProbability >= 60
    ) {

        risk = "HIGH";

        reason =
            "High humidity and rainfall increase fungal disease pressure.";

    } else if (

        weather.humidity >= 70 ||

        weather.rainfallProbability >= 40

    ) {

        risk = "MEDIUM";

        reason =
            "Weather conditions may favour disease development.";

    }

    if (stage === "flowering") {

        reason +=
            " Flowering crops require closer disease monitoring.";

    }

    return {

        risk,

        reason

    };

}
