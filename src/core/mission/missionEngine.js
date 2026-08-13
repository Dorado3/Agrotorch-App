/*
----------------------------------------------------
AgroTorch Mission Engine
Version 4.0.0
Context-Aware Decision Engine
----------------------------------------------------
*/

import { getCropMission } from "../knowledge/missions/missionRegistry.js";

export function buildMission(context, decision) {

    const activities =
        context.dashboard?.activities || 0;

    const disease =
        context.disease?.risk || "LOW";

    const pest =
        context.pest?.risk || "LOW";

    const profit =
        context.profit?.status || "HEALTHY";

    /*
    ------------------------------------------------
    Highest Priority
    ------------------------------------------------
    */

    if (activities === 0) {

        return {

            title:
                "Record Today's Farm Activities",

            reason:
                `No farm activity has been recorded during the ${context.stage} stage.`,

            impact:
                "Improves decision accuracy and reduces management risk."

        };

    }

    if (disease === "HIGH") {

        return {

            title:
                "Prevent Disease Outbreak",

            reason:
                context.disease.reason,

            impact:
                "Reduce disease spread and protect yield."

        };

    }

    if (pest === "HIGH") {

        return {

            title:
                "Scout And Control Pests",

            reason:
                context.pest.reason,

            impact:
                "Prevent severe pest damage."

        };

    }

    if (
        profit === "LOSS" ||
        profit === "LOW PROFIT"
    ) {

        return {

            title:
                "Improve Farm Profitability",

            reason:
                context.profit.advice,

            impact:
                "Increase return on investment."

        };

    }


    /*
    ------------------------------------------------
    Crop Knowledge Fallback
    ------------------------------------------------
    */

    const mission =
        getCropMission(
            context.farm,
            context.week
        );

    if (mission) {

        return mission;

    }

    /*
    ------------------------------------------------
    Default
    ------------------------------------------------
    */

    return {

        title:
            "Continue Routine Farm Operations",

        reason:
            "Farm conditions are stable.",

        impact:
            "Maintain healthy production."

    };

}
