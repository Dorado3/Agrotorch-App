/*
----------------------------------------------------
AgroTorch Marketplace
Commission Service
Version 1.0.0
----------------------------------------------------
*/

import { createCommission } from "./commission.model.js";

export function buildCommission(data = {}) {

    const commission = createCommission(data);

    commission.commissionAmount =

        (commission.amount * commission.commissionRate) / 100;

    commission.sellerReceivable =

        commission.amount - commission.commissionAmount;

    return commission;

}
