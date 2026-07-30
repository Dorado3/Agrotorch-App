/*
----------------------------------------------------
AgroTorch CDRE Rule Engine
Version 1.0.0
----------------------------------------------------
*/

export function evaluateFarmRisk(farm, dashboard) {

    const alerts = [];

    if (!farm) {

        return {

            risk: "UNKNOWN",

            alerts

        };

    }

    if (dashboard.activities === 0) {

        alerts.push({
            level: "HIGH",
            message: "No farm activities have been recorded."
        });

    }

    if (dashboard.harvests > 0 &&
        dashboard.sales === 0) {

        alerts.push({
            level: "MEDIUM",
            message: "Harvest recorded but no sales have been made."
        });

    }

    if (dashboard.expenses > dashboard.revenue) {

        alerts.push({
            level: "HIGH",
            message: "Expenses currently exceed revenue."
        });

    }

    let risk = "LOW";

    if (alerts.some(a => a.level === "HIGH")) {

        risk = "HIGH";

    } else if (alerts.length > 0) {

        risk = "MEDIUM";

    }

    return {

        risk,

        alerts

    };

}
