/*
----------------------------------------------------
AgroTorch Intelligence
Yield Prediction Service
Version 1.0.0
----------------------------------------------------
*/

import { createYieldPrediction } from "./yield.model.js";

export function buildYieldPrediction(data = {}) {

    return createYieldPrediction(data);

}

export function calculateExpectedRevenue(yieldKg, pricePerKg) {

    return yieldKg * pricePerKg;

}

export function calculateExpectedProfit(revenue, cost) {

    return revenue - cost;

}
