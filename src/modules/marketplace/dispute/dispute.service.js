/*
----------------------------------------------------
AgroTorch Marketplace
Dispute Service
Version 1.0.0
----------------------------------------------------
*/

import { createDispute } from "./dispute.model.js";

export function buildDispute(data = {}) {

    return createDispute(data);

}

export function resolveDispute(dispute, resolution, adminId) {

    dispute.status = "resolved";

    dispute.resolution = resolution;

    dispute.resolvedBy = adminId;

    dispute.resolvedAt = new Date().toISOString();

    return dispute;

}

export function closeDispute(dispute) {

    dispute.status = "closed";

    return dispute;

}
