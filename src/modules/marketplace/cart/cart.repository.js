/*
----------------------------------------------------
AgroTorch Marketplace
Cart Repository
Version 2.0.0
----------------------------------------------------
*/

import { buildCart } from "./cart.service.js";

import {

    createCartCloud,

    getCartsCloud,

    getCartCloud,

    updateCartCloud,

    deleteCartCloud

} from "../firestore/CartFirestore.js";

const carts = [];

export const CartRepository = {

    createLocal(data) {

        const cart = buildCart(data);

        carts.push(cart);

        return cart;

    },

    allLocal() {

        return carts;

    },

    findLocal(id) {

        return carts.find(

            cart => cart.id === id

        );

    },

    findByCustomer(customerId) {

        return carts.find(

            cart => cart.customerId === customerId

        );

    },

    async createCloud(data) {

        const cart = buildCart(data);

        return await createCartCloud(cart);

    },

    async allCloud() {

        return await getCartsCloud();

    },

    async findCloud(id) {

        return await getCartCloud(id);

    },

    async updateCloud(id, updates) {

        return await updateCartCloud(id, updates);

    },

    async deleteCloud(id) {

        return await deleteCartCloud(id);

    }

};
