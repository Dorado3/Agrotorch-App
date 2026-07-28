/*
----------------------------------------------------
AgroTorch Dashboard
Seller Dashboard Model
Version 1.0.0
----------------------------------------------------
*/

export function createSellerDashboard(data = {}) {

    return {

        sellerId: data.sellerId || "",

        storeName: data.storeName || "",

        todayOrders: data.todayOrders || 0,

        pendingOrders: data.pendingOrders || 0,

        revenueToday: data.revenueToday || 0,

        totalRevenue: data.totalRevenue || 0,

        lowStockProducts: data.lowStockProducts || 0,

        featuredProducts: data.featuredProducts || 0,

        rating: data.rating || 0,

        newFollowers: data.newFollowers || 0,

        recommendations: data.recommendations || [],

        updatedAt: new Date().toISOString(),

        version: "1.0.0"

    };

}
