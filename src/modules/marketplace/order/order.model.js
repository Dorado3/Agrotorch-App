/*
----------------------------------------------------
AgroTorch Marketplace
Order Model
Version 1.0.0
----------------------------------------------------
*/

export function createOrder(data = {}) {

    return {

        id: data.id || "",

        orderNumber: data.orderNumber || "",

        customerId: data.customerId || "",

        storeId: data.storeId || "",

        items: data.items || [],

        subtotal: data.subtotal || 0,

        discount: data.discount || 0,

        deliveryFee: data.deliveryFee || 0,

        totalAmount: data.totalAmount || 0,

        paymentStatus: data.paymentStatus || "pending",

        orderStatus: data.orderStatus || "pending",

        deliveryStatus: data.deliveryStatus || "pending",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
