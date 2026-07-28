/*
----------------------------------------------------
AgroTorch Intelligence
Farm Digital Twin
Version 1.0.0
----------------------------------------------------
*/

export function createFarmTwin(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        crop: data.crop || "",

        variety: data.variety || "",

        growthStage: data.growthStage || "",

        plantingDate: data.plantingDate || "",

        soilType: data.soilType || "",

        irrigationStatus: data.irrigationStatus || "",

        fertigationStatus: data.fertigationStatus || "",

        diseaseRisk: data.diseaseRisk || "low",

        pestRisk: data.pestRisk || "low",

        weatherRisk: data.weatherRisk || "low",

        expectedYield: data.expectedYield || 0,

        expectedProfit: data.expectedProfit || 0,

        recommendation: data.recommendation || "",

        updatedAt: new Date().toISOString(),

        version: "1.0.0"

    };

}
