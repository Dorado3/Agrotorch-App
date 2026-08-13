/*
----------------------------------------------------
AgroTorch Yield Prediction
Version 1.0.0
----------------------------------------------------
*/

export function predictYield(farm, context) {

    const area =
        Number(farm.area || 1);

    const expectedYield =
        Number(farm.expectedYield || 20);

    const health =
        Number(context.health || 100);

    const execution =
        Number(context.execution?.score || 100);

    const predicted =

        expectedYield *

        (health / 100) *

        (execution / 100);

    return {

        expectedYield,

        predictedYield:

            predicted.toFixed(2),

        totalProduction:

            (predicted * area).toFixed(2)

    };

}
