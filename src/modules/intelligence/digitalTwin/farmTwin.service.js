/*
----------------------------------------------------
AgroTorch Intelligence
Farm Digital Twin Service
Version 1.0.0
----------------------------------------------------
*/

import { createFarmTwin } from "./farmTwin.model.js";

export function buildFarmTwin(data = {}) {

    return createFarmTwin(data);

}

export function updateRecommendation(twin, recommendation) {

    twin.recommendation = recommendation;

    twin.updatedAt = new Date().toISOString();

    return twin;

}
