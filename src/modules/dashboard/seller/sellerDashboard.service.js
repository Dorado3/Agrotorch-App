/*
----------------------------------------------------
AgroTorch Dashboard
Seller Dashboard Service
Version 1.0.0
----------------------------------------------------
*/

import { createSellerDashboard } from "./sellerDashboard.model.js";

export function buildSellerDashboard(data = {}) {

    return createSellerDashboard(data);

}

export function dashboardSummary(dashboard) {

    return {

        todayOrders: dashboard.todayOrders,

        revenueToday: dashboard.revenueToday,

        lowStockProducts: dashboard.lowStockProducts

    };

}
