/*
----------------------------------------------------
AgroTorch System
Audit Model
Version 1.0.0
----------------------------------------------------
*/

export function createAuditLog(data = {}) {

    return {

        id: data.id || "",

        userId: data.userId || "",

        action: data.action || "",

        module: data.module || "",

        entityId: data.entityId || "",

        entityType: data.entityType || "",

        description: data.description || "",

        ipAddress: data.ipAddress || "",

        device: data.device || "",

        createdAt: data.createdAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
