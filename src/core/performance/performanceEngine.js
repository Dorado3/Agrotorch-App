/*
----------------------------------------------------
AgroTorch Performance Engine
Version 1.0.0
----------------------------------------------------
*/

export function calculatePerformance(farm, context) {

    const execution =
        context.execution?.score || 0;

    const health =
        context.health || 0;

    const performance =
        Math.round((execution + health) / 2);

    let status = "EXCELLENT";

    if (performance < 80)
        status = "GOOD";

    if (performance < 60)
        status = "FAIR";

    if (performance < 40)
        status = "POOR";

    return {

        score: performance,

        status

    };

}
