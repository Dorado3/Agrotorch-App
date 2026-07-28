/*
----------------------------------------------------
AgroTorch Marketplace
Order Validator
Version 1.0.0
----------------------------------------------------
*/

export function validateOrder(order) {

    if (!order.customerId) {

        throw new Error("Customer ID is required.");

    }

    if (!order.storeId) {

        throw new Error("Store ID is required.");

    }

    if (!Array.isArray(order.items) || order.items.length === 0) {

        throw new Error("Order must contain at least one item.");

    }

    return true;

}
