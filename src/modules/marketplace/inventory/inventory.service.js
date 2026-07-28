/*
----------------------------------------------------
AgroTorch Marketplace
Inventory Service
Version 1.0.0
----------------------------------------------------
*/

import { createInventory } from "./inventory.model.js";

import { validateInventory } from "./inventory.validator.js";

export function buildInventory(data = {}) {

    const inventory = createInventory(data);

    inventory.available =

        inventory.quantity - inventory.reserved;

    validateInventory(inventory);

    return inventory;

}
