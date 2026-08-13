/*
----------------------------------------------------
AgroTorch Priority Engine
Version 3.0.0
----------------------------------------------------
*/

export function buildPriority(context) {

    const stage =
        (context.stage || "").toLowerCase();

    /*
    ------------------------------------------
    Disease
    ------------------------------------------
    */

    if (context.disease.risk === "HIGH") {

        return {

            score: 100,

            title:
                "🚨 Prevent Disease Outbreak",

            reason:
                context.disease.reason

        };

    }

    /*
    ------------------------------------------
    Pest
    ------------------------------------------
    */

    if (context.pest.risk === "HIGH") {

        return {

            score: 95,

            title:
                "🐛 Control Pest Pressure",

            reason:
                context.pest.reason

        };

    }

    /*
    ------------------------------------------
    Profit
    ------------------------------------------
    */

    if (

        context.profit.status === "LOSS" ||

        context.profit.status === "LOW PROFIT"

    ) {

        return {

            score: 90,

            title:
                "💰 Improve Farm Profitability",

            reason:
                context.profit.advice

        };

    }

    /*
    ------------------------------------------
    Growth Stage
    ------------------------------------------
    */

    switch (stage) {

        case "flowering":

            return {

                score: 70,

                title:
                    "🌸 Protect Flowers",

                reason:
                    "Flower retention determines yield."

            };

        case "fruiting":

            return {

                score: 70,

                title:
                    "🍅 Support Fruit Development",

                reason:
                    "Increase potassium and calcium supply."

            };

    }

    /*
    ------------------------------------------
    Execution
    ------------------------------------------
    */

    if (context.execution.score < 50) {

        return {

            score: 60,

            title:
                "✅ Complete Today's Farm Tasks",

            reason:
                "Execution score is below target."

        };

    }

    /*
    ------------------------------------------
    Normal
    ------------------------------------------
    */

    return {

        score: 10,

        title:
            "🌱 Continue Routine Farm Operations",

        reason:
            "Farm conditions are stable."

    };

}
