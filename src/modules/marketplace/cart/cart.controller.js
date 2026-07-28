/*
----------------------------------------------------
AgroTorch Marketplace
Cart Controller
Version 1.0.0
----------------------------------------------------
*/

import { CartRepository } from "./cart.repository.js";

export const CartController = {

    async createCart(data) {

        return await CartRepository.createCloud(data);

    },

    async getCarts() {

        return await CartRepository.allCloud();

    },

    async getCart(id) {

        return await CartRepository.findCloud(id);

    },

    async updateCart(id, updates) {

        return await CartRepository.updateCloud(

            id,

            updates

        );

    },

    async deleteCart(id) {

        return await CartRepository.deleteCloud(id);

    }

};
