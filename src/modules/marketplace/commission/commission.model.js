/*
----------------------------------------------------
AgroTorch Marketplace
Commission Model
Version 1.0.0
----------------------------------------------------
*/

export function createCommission(data = {}) {

    return {

        id: data.id || "",

        orderId: data.orderId || "",

        sellerId: data.sellerId || "",

        buyerId: data.buyerId || "",

        amount: data.amount || 0,

        commissionRate: data.commissionRate || 0,

        commissionAmount: data.commissionAmount || 0,

        sellerReceivable: data.sellerReceivable || 0,

        status: data.status || "pending",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
