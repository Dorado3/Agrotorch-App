/*
----------------------------------------------------
AgroTorch Marketplace
Cart Validator
Version 1.0.0
----------------------------------------------------
*/

export function validateCart(cart) {

    if (!cart.customerId) {

        throw new Error("Customer ID is required.");

    }

    if (!Array.isArray(cart.items)) {

        throw new Error("Items must be an array.");

    }

    return true;

}
