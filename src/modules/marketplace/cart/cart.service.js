/*
----------------------------------------------------
AgroTorch Marketplace
Cart Service
Version 1.0.0
----------------------------------------------------
*/

import { createCart } from "./cart.model.js";

import { validateCart } from "./cart.validator.js";

export function buildCart(data = {}) {

    const cart = createCart(data);

    cart.totalItems = cart.items.length;

    cart.totalAmount =

        cart.subtotal -

        cart.discount +

        cart.deliveryFee;

    validateCart(cart);

    return cart;

}
