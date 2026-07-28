/*
----------------------------------------------------
AgroTorch Marketplace
Featured Listing Model
Version 1.0.0
----------------------------------------------------
*/

export function createFeaturedListing(data = {}) {

    return {

        id: data.id || "",

        listingId: data.listingId || "",

        listingType: data.listingType || "product",

        sellerId: data.sellerId || "",

        title: data.title || "",

        promotionType: data.promotionType || "featured",

        position: data.position || 1,

        priority: data.priority || 1,

        amountPaid: data.amountPaid || 0,

        currency: data.currency || "NGN",

        status: data.status || "active",

        startsAt: data.startsAt || new Date().toISOString(),

        expiresAt: data.expiresAt || "",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
