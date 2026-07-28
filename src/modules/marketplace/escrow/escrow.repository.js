/*
----------------------------------------------------
AgroTorch Marketplace
Escrow Repository
Version 1.0.0
----------------------------------------------------
*/

import { buildEscrow } from "./escrow.service.js";

const escrows = [];

export const EscrowRepository = {

    create(data) {

        const escrow = buildEscrow(data);

        escrows.push(escrow);

        return escrow;

    },

    all() {

        return escrows;

    },

    find(id) {

        return escrows.find(

            escrow => escrow.id === id

        );

    },

    update(id, updates) {

        const index = escrows.findIndex(

            escrow => escrow.id === id

        );

        if (index === -1) {

            return null;

        }

        escrows[index] = {

            ...escrows[index],

            ...updates,

            updatedAt: new Date().toISOString()

        };

        return escrows[index];

    },

    delete(id) {

        const index = escrows.findIndex(

            escrow => escrow.id === id

        );

        if (index === -1) {

            return false;

        }

        escrows.splice(index, 1);

        return true;

    }

};
