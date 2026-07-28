/*
----------------------------------------------------
AgroTorch Dashboard
Farmer Dashboard Model
Version 1.0.0
----------------------------------------------------
*/

export function createFarmerDashboard(data = {}) {

    return {

        farmId: data.farmId || "",

        farmerName: data.farmerName || "",

        farmHealthScore: data.farmHealthScore || 100,

        todayTasks: data.todayTasks || [],

        weather: data.weather || {},

        diseaseRisk: data.diseaseRisk || {},

        pestRisk: data.pestRisk || {},

        expectedYield: data.expectedYield || 0,

        expectedProfit: data.expectedProfit || 0,

        marketAlert: data.marketAlert || "",

        aiRecommendation: data.aiRecommendation || "",

        updatedAt: new Date().toISOString(),

        version: "1.0.0"

    };

}
