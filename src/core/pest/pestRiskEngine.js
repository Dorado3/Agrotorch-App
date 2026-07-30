/*
----------------------------------------------------
AgroTorch Pest Risk Engine
Version 1.0.0
----------------------------------------------------
*/

export function evaluatePestRisk(context) {

    let risk = "LOW";

    let reason =
        "No significant pest pressure detected.";

    const weather =
        context.weather;

    const stage =
        (context.stage || "").toLowerCase();

    if (

        weather.temperature >= 30 &&

        weather.humidity >= 70

    ) {

        risk = "HIGH";

        reason =
            "Warm and humid conditions favour rapid pest development.";

    } else if (

        weather.temperature >= 28 ||

        weather.humidity >= 60

    ) {

        risk = "MEDIUM";

        reason =
            "Weather conditions may encourage pest activity.";

    }

    if (

        stage === "flowering" ||

        stage === "fruiting"

    ) {

        reason +=
            " Flowering and fruiting stages require frequent scouting.";

    }

    return {

        risk,

        reason

    };

}
