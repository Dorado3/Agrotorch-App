/*
----------------------------------------------------
AgroTorch Health Engine
Version 2.0.0
----------------------------------------------------
*/

export function calculateHealth(context) {

    let score = 100;

    /*
    ----------------------------------------
    Execution
    ----------------------------------------
    */

    score -= (100 - context.execution.score) * 0.3;

    /*
    ----------------------------------------
    Disease
    ----------------------------------------
    */

    if (context.disease.risk === "HIGH")
        score -= 20;

    else if (context.disease.risk === "MEDIUM")
        score -= 10;

    /*
    ----------------------------------------
    Pest
    ----------------------------------------
    */

    if (context.pest.risk === "HIGH")
        score -= 15;

    else if (context.pest.risk === "MEDIUM")
        score -= 8;

    /*
    ----------------------------------------
    Profit
    ----------------------------------------
    */

    if (context.profit.status === "LOSS")
        score -= 15;

    else if (context.profit.status === "LOW PROFIT")
        score -= 8;

    score = Math.max(0, Math.min(100, Math.round(score)));

    return score;

}
