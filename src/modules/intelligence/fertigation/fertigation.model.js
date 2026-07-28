/*
----------------------------------------------------
AgroTorch Intelligence
Fertigation Model
Version 1.0.0
----------------------------------------------------
*/

export function createFertigationPlan(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        crop: data.crop || "",

        variety: data.variety || "",

        growthStage: data.growthStage || "",

        fertilizer: data.fertilizer || "",

        quantity: data.quantity || "",

        unit: data.unit || "kg",

        applicationMethod: data.applicationMethod || "fertigation",

        recommendation: data.recommendation || "",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
