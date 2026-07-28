/*
----------------------------------------------------
AgroTorch Marketplace
Governance Validator
Version 1.0.0
----------------------------------------------------
*/

export function validateGovernanceRule(rule) {

    if (!rule.ruleName) {

        throw new Error("Rule name is required.");

    }

    if (!rule.ruleType) {

        throw new Error("Rule type is required.");

    }

    return true;

}
