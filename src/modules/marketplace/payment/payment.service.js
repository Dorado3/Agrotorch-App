/*
----------------------------------------------------
AgroTorch Marketplace
Payment Service
Version 1.0.0
----------------------------------------------------
*/

import { createPayment } from "./payment.model.js";

import { validatePayment } from "./payment.validator.js";

export function buildPayment(data = {}) {

    const payment = createPayment(data);

    validatePayment(payment);

    return payment;

}
