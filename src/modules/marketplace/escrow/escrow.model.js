/*
----------------------------------------------------
AgroTorch Marketplace
Escrow Model
Version 1.0.0
----------------------------------------------------
*/

export function createEscrow(data = {}) {

    return {

        id: data.id || "",

        orderId: data.orderId || "",

        buyerId: data.buyerId || "",

        sellerId: data.sellerId || "",

        amount: data.amount || 0,

        currency: data.currency || "NGN",

        status: data.status || "pending",

        paymentStatus: data.paymentStatus || "awaiting_payment",

        releasedAt: data.releasedAt || null,

        refundedAt: data.refundedAt || null,

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
