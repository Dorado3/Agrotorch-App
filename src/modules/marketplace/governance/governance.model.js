/*
----------------------------------------------------
AgroTorch Marketplace
Governance Model
Version 1.0.0
----------------------------------------------------
*/

export function createGovernanceRule(data = {}) {

    return {

        id: data.id || "",

        ruleName: data.ruleName || "",

        ruleType: data.ruleType || "",

        description: data.description || "",

        enabled: data.enabled ?? true,

        createdBy: data.createdBy || "system",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
