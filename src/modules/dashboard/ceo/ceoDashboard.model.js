/*
----------------------------------------------------
AgroTorch Dashboard
CEO Dashboard Model
Version 1.0.0
----------------------------------------------------
*/

export function createCeoDashboard(data = {}) {

    return {

        activeFarmers: data.activeFarmers || 0,

        verifiedStores: data.verifiedStores || 0,

        totalProducts: data.totalProducts || 0,

        todayOrders: data.todayOrders || 0,

        grossMerchandiseValue: data.grossMerchandiseValue || 0,

        commissionRevenue: data.commissionRevenue || 0,

        subscriptionRevenue: data.subscriptionRevenue || 0,

        featuredRevenue: data.featuredRevenue || 0,

        platformHealth: data.platformHealth || 100,

        topState: data.topState || "",

        fastestGrowingCategory: data.fastestGrowingCategory || "",

        aiDecisionsToday: data.aiDecisionsToday || 0,

        farmerSatisfaction: data.farmerSatisfaction || 0,

        updatedAt: new Date().toISOString(),

        version: "1.0.0"

    };

}
