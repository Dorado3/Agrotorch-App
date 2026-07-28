/*
----------------------------------------------------
AgroTorch Marketplace
Order Service
Version 1.0.0
----------------------------------------------------
*/

import { createOrder } from "./order.model.js";

import { validateOrder } from "./order.validator.js";

export function buildOrder(data = {}) {

    const order = createOrder(data);

    order.totalAmount =

        order.subtotal -

        order.discount +

        order.deliveryFee;

    validateOrder(order);

    return order;

}
