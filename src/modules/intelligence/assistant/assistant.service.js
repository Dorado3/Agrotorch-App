/*
----------------------------------------------------
AgroTorch Intelligence
AI Assistant Service
Version 1.0.0
----------------------------------------------------
*/

import { createAssistantResponse } from "./assistant.model.js";

export function buildAssistantResponse(data = {}) {

    return createAssistantResponse(data);

}

export function defaultGreeting(farmName = "Farmer") {

    return `Good morning, ${farmName}. Your farm intelligence is ready.`;

}
