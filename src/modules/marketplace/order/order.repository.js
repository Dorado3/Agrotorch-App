/*
----------------------------------------------------
AgroTorch Marketplace
Order Repository
Version 2.0.0
----------------------------------------------------
*/

import { buildOrder } from "./order.service.js";

import {

    createOrderCloud,

    getOrdersCloud,

    getOrderCloud,

    updateOrderCloud,

    deleteOrderCloud

} from "../firestore/OrderFirestore.js";

const orders = [];

export const OrderRepository = {

    createLocal(data) {

        const order = buildOrder(data);

        orders.push(order);

        return order;

    },

    allLocal() {

        return orders;

    },

    findLocal(id) {

        return orders.find(

            order => order.id === id

        );

    },

    findByCustomer(customerId) {

        return orders.filter(

            order => order.customerId === customerId

        );

    },

    findByStore(storeId) {

        return orders.filter(

            order => order.storeId === storeId

        );

    },

    async createCloud(data) {

        const order = buildOrder(data);

        return await createOrderCloud(order);

    },

    async allCloud() {

        return await getOrdersCloud();

    },

    async findCloud(id) {

        return await getOrderCloud(id);

    },

    async updateCloud(id, updates) {

        return await updateOrderCloud(id, updates);

    },

    async deleteCloud(id) {

        return await deleteOrderCloud(id);

    }

};
