/*
----------------------------------------------------
AgroTorch Intelligence
Pest Risk Model
Version 1.0.0
----------------------------------------------------
*/

export function createPestRisk(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        crop: data.crop || "",

        pest: data.pest || "",

        riskLevel: data.riskLevel || "low",

        confidence: data.confidence || 0,

        recommendation: data.recommendation || "",

        weatherFactors: data.weatherFactors || {},

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
