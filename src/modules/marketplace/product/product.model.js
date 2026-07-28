/*
----------------------------------------------------
AgroTorch Marketplace
Product Model
Version 1.0.0
----------------------------------------------------
*/

export function createProduct(data = {}) {

    return {

        id: data.id || "",

        storeId: data.storeId || "",

        name: data.name || "",

        category: data.category || "",

        description: data.description || "",

        sku: data.sku || "",

        barcode: data.barcode || "",

        price: data.price || 0,

        currency: data.currency || "NGN",

        quantity: data.quantity || 0,

        unit: data.unit || "",

        images: data.images || [],

        status: data.status || "active",

        featured: data.featured || false,

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
