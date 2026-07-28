/*
----------------------------------------------------
AgroTorch Dashboard
Admin Dashboard Service
Version 1.0.0
----------------------------------------------------
*/

import { createAdminDashboard } from "./adminDashboard.model.js";

export function buildAdminDashboard(data = {}) {

    return createAdminDashboard(data);

}

export function dashboardSummary(dashboard) {

    return {

        users: dashboard.totalUsers,

        pendingProducts: dashboard.pendingProducts,

        disputes: dashboard.disputes,

        platformHealth: dashboard.platformHealth

    };

}
