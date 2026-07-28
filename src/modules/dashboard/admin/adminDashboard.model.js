/*
----------------------------------------------------
AgroTorch Dashboard
Admin Dashboard Model
Version 1.0.0
----------------------------------------------------
*/

export function createAdminDashboard(data = {}) {

    return {

        totalUsers: data.totalUsers || 0,

        pendingStoreVerification: data.pendingStoreVerification || 0,

        pendingProducts: data.pendingProducts || 0,

        disputes: data.disputes || 0,

        escrowTransactions: data.escrowTransactions || 0,

        todayOrders: data.todayOrders || 0,

        marketplaceRevenue: data.marketplaceRevenue || 0,

        commissionRevenue: data.commissionRevenue || 0,

        platformHealth: data.platformHealth || 100,

        alerts: data.alerts || [],

        updatedAt: new Date().toISOString(),

        version: "1.0.0"

    };

}
