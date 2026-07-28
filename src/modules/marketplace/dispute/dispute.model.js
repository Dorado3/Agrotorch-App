/*
----------------------------------------------------
AgroTorch Marketplace
Dispute Model
Version 1.0.0
----------------------------------------------------
*/

export function createDispute(data = {}) {

    return {

        id: data.id || "",

        orderId: data.orderId || "",

        escrowId: data.escrowId || "",

        buyerId: data.buyerId || "",

        sellerId: data.sellerId || "",

        reason: data.reason || "",

        description: data.description || "",

        evidence: data.evidence || [],

        status: data.status || "open",

        resolution: data.resolution || "",

        resolvedBy: data.resolvedBy || "",

        resolvedAt: data.resolvedAt || null,

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
