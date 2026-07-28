/*
----------------------------------------------------
AgroTorch Dashboard
Farmer Dashboard Service
Version 1.0.0
----------------------------------------------------
*/

import { createFarmerDashboard } from "./farmerDashboard.model.js";

export function buildFarmerDashboard(data = {}) {

    return createFarmerDashboard(data);

}

export function dashboardSummary(dashboard) {

    return {

        tasksToday: dashboard.todayTasks.length,

        farmHealthScore: dashboard.farmHealthScore,

        expectedProfit: dashboard.expectedProfit

    };

}
