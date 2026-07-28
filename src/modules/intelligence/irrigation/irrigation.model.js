/*
----------------------------------------------------
AgroTorch Intelligence
Irrigation Model
Version 1.0.0
----------------------------------------------------
*/

export function createIrrigationPlan(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        crop: data.crop || "",

        growthStage: data.growthStage || "",

        soilType: data.soilType || "",

        rainfallForecast: data.rainfallForecast || 0,

        irrigationRequired: data.irrigationRequired ?? true,

        recommendedTime: data.recommendedTime || "06:00",

        recommendation: data.recommendation || "",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
