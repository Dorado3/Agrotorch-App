/*
----------------------------------------------------
AgroTorch Dashboard
CEO Dashboard Service
Version 1.0.0
----------------------------------------------------
*/

import { createCeoDashboard } from "./ceoDashboard.model.js";

export function buildCeoDashboard(data = {}) {

    return createCeoDashboard(data);

}

export function executiveSummary(dashboard) {

    return {

        activeFarmers: dashboard.activeFarmers,

        verifiedStores: dashboard.verifiedStores,

        todayOrders: dashboard.todayOrders,

        commissionRevenue: dashboard.commissionRevenue,

        platformHealth: dashboard.platformHealth

    };

}
