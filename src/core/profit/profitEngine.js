/*
----------------------------------------------------
AgroTorch Profit Intelligence Engine
Version 1.0.0
----------------------------------------------------
*/

export function evaluateProfit(context, dashboard) {

    const revenue =
        Number(dashboard.revenue || 0);

    const expenses =
        Number(dashboard.expenses || 0);

    const profit =
        revenue - expenses;

    let status = "HEALTHY";

    let advice =
        "Farm profitability is on track.";

    if (profit < 0) {

        status = "LOSS";

        advice =
            "Expenses are higher than revenue. Reduce costs and improve productivity.";

    } else if (profit === 0) {

        status = "BREAK EVEN";

        advice =
            "The farm has not yet generated profit.";

    } else if (profit < (expenses * 0.20)) {

        status = "LOW PROFIT";

        advice =
            "Profit margin is low. Review production efficiency.";

    }

    return {

        revenue,

        expenses,

        profit,

        status,

        advice

    };

}
