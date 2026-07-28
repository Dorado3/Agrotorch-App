/*
----------------------------------------------------
AgroTorch Marketplace
Subscription Model
Version 1.0.0
----------------------------------------------------
*/

export function createSubscription(data = {}) {

    return {

        id: data.id || "",

        sellerId: data.sellerId || "",

        planName: data.planName || "Starter",

        billingCycle: data.billingCycle || "monthly",

        amount: data.amount || 0,

        currency: data.currency || "NGN",

        status: data.status || "active",

        startsAt: data.startsAt || new Date().toISOString(),

        expiresAt: data.expiresAt || "",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
