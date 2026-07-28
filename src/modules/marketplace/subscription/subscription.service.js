/*
----------------------------------------------------
AgroTorch Marketplace
Subscription Service
Version 1.0.0
----------------------------------------------------
*/

import { createSubscription } from "./subscription.model.js";

export function buildSubscription(data = {}) {

    return createSubscription(data);

}
