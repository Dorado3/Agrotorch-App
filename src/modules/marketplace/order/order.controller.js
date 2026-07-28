/*
----------------------------------------------------
AgroTorch Marketplace
Order Controller
Version 1.0.0
----------------------------------------------------
*/

import { OrderRepository } from "./order.repository.js";

export const OrderController = {

    async createOrder(data) {

        return await OrderRepository.createCloud(data);

    },

    async getOrders() {

        return await OrderRepository.allCloud();

    },

    async getOrder(id) {

        return await OrderRepository.findCloud(id);

    },

    async updateOrder(id, updates) {

        return await OrderRepository.updateCloud(

            id,

            updates

        );

    },

    async deleteOrder(id) {

        return await OrderRepository.deleteCloud(id);

    }

};
