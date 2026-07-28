/*
----------------------------------------------------
AgroTorch Intelligence
Profit Intelligence Model
Version 1.0.0
----------------------------------------------------
*/

export function createProfitAnalysis(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        estimatedRevenue: data.estimatedRevenue || 0,

        estimatedCost: data.estimatedCost || 0,

        estimatedProfit: data.estimatedProfit || 0,

        roi: data.roi || 0,

        breakEvenPrice: data.breakEvenPrice || 0,

        recommendation: data.recommendation || "",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
