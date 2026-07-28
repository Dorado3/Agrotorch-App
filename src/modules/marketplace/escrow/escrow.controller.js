/*
----------------------------------------------------
AgroTorch Marketplace
Escrow Controller
Version 1.0.0
----------------------------------------------------
*/

import { EscrowRepository } from "./escrow.repository.js";

export const EscrowController = {

    createEscrow(data) {

        return EscrowRepository.create(data);

    },

    getEscrows() {

        return EscrowRepository.all();

    },

    getEscrow(id) {

        return EscrowRepository.find(id);

    },

    updateEscrow(id, updates) {

        return EscrowRepository.update(id, updates);

    },

    deleteEscrow(id) {

        return EscrowRepository.delete(id);

    }

};
