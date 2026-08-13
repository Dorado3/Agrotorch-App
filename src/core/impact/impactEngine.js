/*
----------------------------------------------------
AgroTorch Economic Impact Engine
Version 1.0.0
----------------------------------------------------
*/

export function calculateImpact(context) {

    let amount = 0;

    if (context.disease.risk === "HIGH")
        amount += 75000;

    else if (context.disease.risk === "MEDIUM")
        amount += 30000;

    if (context.pest.risk === "HIGH")
        amount += 50000;

    else if (context.pest.risk === "MEDIUM")
        amount += 20000;

    if (context.execution.score < 50)
        amount += 15000;

    return {

        protectedValue: amount,

        message:

            amount > 0

                ? `Estimated profit protected: ₦${amount.toLocaleString()}`

                : "No major financial risk detected today."

    };

}
