/*
----------------------------------------------------
AgroTorch Marketplace
Payment Model
Version 1.0.0
----------------------------------------------------
*/

export function createPayment(data = {}) {

    return {

        id: data.id || "",

        orderId: data.orderId || "",

        customerId: data.customerId || "",

        amount: data.amount || 0,

        currency: data.currency || "NGN",

        paymentMethod: data.paymentMethod || "flutterwave",

        transactionReference: data.transactionReference || "",

        paymentStatus: data.paymentStatus || "pending",

        gatewayResponse: data.gatewayResponse || null,

        paidAt: data.paidAt || null,

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
