/*
----------------------------------------------------
AgroTorch Intelligence
AI Assistant Model
Version 1.0.0
----------------------------------------------------
*/

export function createAssistantResponse(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        question: data.question || "",

        answer: data.answer || "",

        confidence: data.confidence || 0,

        recommendations: data.recommendations || [],

        createdAt: new Date().toISOString(),

        version: "1.0.0"

    };

}
