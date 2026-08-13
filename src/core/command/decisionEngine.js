/*
----------------------------------------------------
AgroTorch Decision Engine
Version 2.0.0
----------------------------------------------------
*/

import { evaluateFarmRisk } from "../cdre/ruleEngine.js";
import { buildFarmDashboard } from "../dashboard/farmDashboard.js";

export function buildDecisionCenter(farm) {

    const dashboard =
        buildFarmDashboard();

    const cdre =
        evaluateFarmRisk(
            farm,
            dashboard
        );

    let mission =
        "Continue Monitoring";

    let health = 95;

    switch (cdre.risk) {

        case "HIGH":

            mission =
                "Resolve High Risk Immediately";

            health = 55;

            break;

        case "MEDIUM":

            mission =
                "Inspect Farm Today";

            health = 75;

            break;

        default:

            mission =
                "Continue Monitoring";

            health = 95;

    }

    return {

        health,

        mission,

        alerts:
            cdre.alerts,

        risk:
            cdre.risk,

        dashboard

    };

}
