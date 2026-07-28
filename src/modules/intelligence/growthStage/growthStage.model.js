/*
----------------------------------------------------
AgroTorch Intelligence
Growth Stage Model
Version 1.0.0
----------------------------------------------------
*/

export function createGrowthStage(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        crop: data.crop || "",

        variety: data.variety || "",

        plantingDate: data.plantingDate || "",

        daysAfterPlanting: data.daysAfterPlanting || 0,

        currentStage: data.currentStage || "seedling",

        nextStage: data.nextStage || "",

        updatedAt: new Date().toISOString(),

        version: "1.0.0"

    };

}
