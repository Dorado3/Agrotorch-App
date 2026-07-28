/*
----------------------------------------------------
AgroTorch Marketplace
Escrow Service
Version 1.0.0
----------------------------------------------------
*/

import { createEscrow } from "./escrow.model.js";

export function buildEscrow(data = {}) {

    return createEscrow(data);

}

export function releaseEscrow(escrow) {

    escrow.status = "released";

    escrow.paymentStatus = "paid";

    escrow.releasedAt = new Date().toISOString();

    return escrow;

}

export function refundEscrow(escrow) {

    escrow.status = "refunded";

    escrow.paymentStatus = "refunded";

    escrow.refundedAt = new Date().toISOString();

    return escrow;

}
