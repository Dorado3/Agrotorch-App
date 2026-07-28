/*
----------------------------------------------------
AgroTorch Intelligence
CDRE Master Decision Service
Version 1.0.0
----------------------------------------------------
*/

import { createDailyDecision } from "./cdre.model.js";

export function buildDailyDecision(data = {}) {

    return createDailyDecision(data);

}

export function generateSummary(decision) {

    return {

        priority: decision.priority,

        actionsToday: decision.actions.length,

        alerts: decision.alerts.length,

        opportunities: decision.opportunities.length,

        farmHealthScore: decision.farmHealthScore,

        expectedProfit: decision.expectedProfit

    };

}
