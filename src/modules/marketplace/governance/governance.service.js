/*
----------------------------------------------------
AgroTorch Marketplace
Governance Service
Version 1.0.0
----------------------------------------------------
*/

import { createGovernanceRule } from "./governance.model.js";

import { validateGovernanceRule } from "./governance.validator.js";

export function buildGovernanceRule(data = {}) {

    const rule = createGovernanceRule(data);

    validateGovernanceRule(rule);

    return rule;

}
