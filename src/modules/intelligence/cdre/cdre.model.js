/*
----------------------------------------------------
AgroTorch Intelligence
CDRE Master Decision Model
Version 1.0.0
----------------------------------------------------
*/

export function createDailyDecision(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        decisionDate: data.decisionDate || new Date().toISOString(),

        priority: data.priority || "medium",

        actions: data.actions || [],

        alerts: data.alerts || [],

        opportunities: data.opportunities || [],

        farmHealthScore: data.farmHealthScore || 100,

        expectedProfit: data.expectedProfit || 0,

        createdAt: new Date().toISOString(),

        version: "1.0.0"

    };

}
