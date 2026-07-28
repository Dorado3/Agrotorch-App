/*
----------------------------------------------------
AgroTorch Intelligence
Profit Intelligence Service
Version 1.0.0
----------------------------------------------------
*/

import { createProfitAnalysis } from "./profit.model.js";

export function buildProfitAnalysis(data = {}) {

    return createProfitAnalysis(data);

}

export function calculateROI(revenue, cost) {

    if (cost <= 0) {

        return 0;

    }

    return ((revenue - cost) / cost) * 100;

}

export function calculateBreakEvenPrice(totalCost, expectedYield) {

    if (expectedYield <= 0) {

        return 0;

    }

    return totalCost / expectedYield;

}
