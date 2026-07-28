/*
----------------------------------------------------
AgroTorch Intelligence
Market Intelligence Model
Version 1.0.0
----------------------------------------------------
*/

export function createMarketRecord(data = {}) {

    return {

        id: data.id || "",

        crop: data.crop || "",

        marketName: data.marketName || "",

        state: data.state || "",

        averagePrice: data.averagePrice || 0,

        priceUnit: data.priceUnit || "kg",

        demandLevel: data.demandLevel || "medium",

        supplyLevel: data.supplyLevel || "medium",

        trend: data.trend || "stable",

        recommendation: data.recommendation || "",

        updatedAt: new Date().toISOString(),

        version: "1.0.0"

    };

}
