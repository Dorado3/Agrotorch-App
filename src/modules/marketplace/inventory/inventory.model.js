/*
----------------------------------------------------
AgroTorch Marketplace
Inventory Model
Version 1.0.0
----------------------------------------------------
*/

export function createInventory(data = {}) {

    return {

        id: data.id || "",

        productId: data.productId || "",

        warehouseId: data.warehouseId || "",

        quantity: data.quantity || 0,

        reserved: data.reserved || 0,

        available: data.available || 0,

        minimumStock: data.minimumStock || 0,

        maximumStock: data.maximumStock || 0,

        reorderLevel: data.reorderLevel || 0,

        status: data.status || "available",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
