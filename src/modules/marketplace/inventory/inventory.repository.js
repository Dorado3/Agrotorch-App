/*
----------------------------------------------------
AgroTorch Marketplace
Inventory Repository
Version 2.0.0
----------------------------------------------------
*/

import { buildInventory } from "./inventory.service.js";

import {

    createInventoryCloud,

    getInventoriesCloud,

    getInventoryCloud,

    updateInventoryCloud,

    deleteInventoryCloud

} from "../firestore/InventoryFirestore.js";

const inventories = [];

export const InventoryRepository = {

    createLocal(data) {

        const inventory = buildInventory(data);

        inventories.push(inventory);

        return inventory;

    },

    allLocal() {

        return inventories;

    },

    findLocal(id) {

        return inventories.find(

            inventory => inventory.id === id

        );

    },

    findByProduct(productId) {

        return inventories.find(

            inventory => inventory.productId === productId

        );

    },

    async createCloud(data) {

        const inventory = buildInventory(data);

        return await createInventoryCloud(inventory);

    },

    async allCloud() {

        return await getInventoriesCloud();

    },

    async findCloud(id) {

        return await getInventoryCloud(id);

    },

    async updateCloud(id, updates) {

        return await updateInventoryCloud(id, updates);

    },

    async deleteCloud(id) {

        return await deleteInventoryCloud(id);

    }

};
