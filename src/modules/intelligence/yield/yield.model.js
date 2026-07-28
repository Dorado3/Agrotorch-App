/*
----------------------------------------------------
AgroTorch Intelligence
Yield Prediction Model
Version 1.0.0
----------------------------------------------------
*/

export function createYieldPrediction(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        crop: data.crop || "",

        variety: data.variety || "",

        estimatedYield: data.estimatedYield || 0,

        yieldUnit: data.yieldUnit || "kg",

        estimatedHarvestDate: data.estimatedHarvestDate || "",

        confidence: data.confidence || 0,

        expectedRevenue: data.expectedRevenue || 0,

        expectedProfit: data.expectedProfit || 0,

        recommendation: data.recommendation || "",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
