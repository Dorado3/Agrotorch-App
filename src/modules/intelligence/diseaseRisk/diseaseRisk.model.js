/*
----------------------------------------------------
AgroTorch Intelligence
Disease Risk Model
Version 1.0.0
----------------------------------------------------
*/

export function createDiseaseRisk(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        crop: data.crop || "",

        disease: data.disease || "",

        riskLevel: data.riskLevel || "low",

        confidence: data.confidence || 0,

        recommendation: data.recommendation || "",

        weatherFactors: data.weatherFactors || {},

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
