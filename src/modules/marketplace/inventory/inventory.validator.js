/*
----------------------------------------------------
AgroTorch Marketplace
Inventory Validator
Version 1.0.0
----------------------------------------------------
*/

export function validateInventory(inventory) {

    if (!inventory.productId) {

        throw new Error("Product ID is required.");

    }

    if (inventory.quantity < 0) {

        throw new Error("Quantity cannot be negative.");

    }

    return true;

}
