/*
----------------------------------------------------
AgroTorch Marketplace
Governance Controller
Version 1.0.0
----------------------------------------------------
*/

import { GovernanceRepository } from "./governance.repository.js";

export const GovernanceController = {

    createRule(data) {

        return GovernanceRepository.create(data);

    },

    getRules() {

        return GovernanceRepository.all();

    },

    getRule(id) {

        return GovernanceRepository.find(id);

    },

    updateRule(id, updates) {

        return GovernanceRepository.update(id, updates);

    },

    deleteRule(id) {

        return GovernanceRepository.delete(id);

    }

};
