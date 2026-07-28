/*
----------------------------------------------------
AgroTorch Marketplace
Cart Model
Version 1.0.0
----------------------------------------------------
*/

export function createCart(data = {}) {

    return {

        id: data.id || "",

        customerId: data.customerId || "",

        storeId: data.storeId || "",

        items: data.items || [],

        totalItems: data.totalItems || 0,

        subtotal: data.subtotal || 0,

        discount: data.discount || 0,

        deliveryFee: data.deliveryFee || 0,

        totalAmount: data.totalAmount || 0,

        status: data.status || "active",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
