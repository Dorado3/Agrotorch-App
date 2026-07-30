/*
----------------------------------------------------
AgroTorch Decision Engine
Version 1.0.0
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

    if (cdre.risk === "HIGH") {

        mission =
            "Resolve High Risk Immediately";

    }

    else if (cdre.risk === "MEDIUM") {

        mission =
            "Inspect Farm Today";

    }

    return {

        health:

            cdre.risk === "LOW"

                ? 95

                : cdre.risk === "MEDIUM"

                    ? 75

                    : 55,

        mission,

        alerts:

            cdre.alerts,

        risk:

            cdre.risk

    };

}
