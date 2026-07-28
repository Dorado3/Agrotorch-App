/*
----------------------------------------------------
AgroTorch Marketplace
Inventory Controller
Version 1.0.0
----------------------------------------------------
*/

import { InventoryRepository } from "./inventory.repository.js";

export const InventoryController = {

    async createInventory(data) {

        return await InventoryRepository.createCloud(data);

    },

    async getInventories() {

        return await InventoryRepository.allCloud();

    },

    async getInventory(id) {

        return await InventoryRepository.findCloud(id);

    },

    async updateInventory(id, updates) {

        return await InventoryRepository.updateCloud(

            id,

            updates

        );

    },

    async deleteInventory(id) {

        return await InventoryRepository.deleteCloud(id);

    }

};
