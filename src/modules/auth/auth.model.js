/*
----------------------------------------------------
AgroTorch Authentication
User Model
Version 1.0.0
----------------------------------------------------
*/

export function createUser(data = {}) {

    return {

        id: data.id || "",

        fullName: data.fullName || "",

        email: data.email || "",

        phone: data.phone || "",

        role: data.role || "farmer",

        verified: data.verified ?? false,

        active: data.active ?? true,

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
