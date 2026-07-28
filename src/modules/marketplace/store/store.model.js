/*
----------------------------------------------------
AgroTorch Marketplace
Store Model
Version 1.0.0
----------------------------------------------------
*/

export function createStore(data = {}) {

    return {

        id: data.id || "",

        ownerId: data.ownerId || "",

        storeName: data.storeName || "",

        slug: data.slug || "",

        description: data.description || "",

        logo: data.logo || "",

        coverImage: data.coverImage || "",

        businessType: data.businessType || "Farm",

        phone: data.phone || "",

        email: data.email || "",

        country: data.country || "",

        state: data.state || "",

        lga: data.lga || "",

        address: data.address || "",

        verification: data.verification || false,

        rating: data.rating || 0,

        followers: data.followers || 0,

        status: data.status || "active",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
