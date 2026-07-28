/*
----------------------------------------------------
AgroTorch Marketplace
Governance Repository
Version 2.0.0
----------------------------------------------------
*/

import { buildGovernanceRule } from "./governance.service.js";

import {

    createRuleCloud,

    getRulesCloud,

    getRuleCloud,

    updateRuleCloud,

    deleteRuleCloud

} from "../firestore/GovernanceFirestore.js";

const rules = [];

export const GovernanceRepository = {

    createLocal(data) {

        const rule = buildGovernanceRule(data);

        rules.push(rule);

        return rule;

    },

    allLocal() {

        return rules;

    },

    async createCloud(data) {

        const rule = buildGovernanceRule(data);

        return await createRuleCloud(rule);

    },

    async allCloud() {

        return await getRulesCloud();

    },

    async findCloud(id) {

        return await getRuleCloud(id);

    },

    async updateCloud(id, updates) {

        return await updateRuleCloud(id, updates);

    },

    async deleteCloud(id) {

        return await deleteRuleCloud(id);

    }

};
