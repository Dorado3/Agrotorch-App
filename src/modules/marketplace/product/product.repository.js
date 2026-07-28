/*
----------------------------------------------------
AgroTorch Marketplace
Product Repository
Version 2.0.0
----------------------------------------------------
*/

import { buildProduct } from "./product.service.js";

import {

    createProductCloud,

    getProductsCloud,

    getProductCloud,

    updateProductCloud,

    deleteProductCloud

} from "../firestore/ProductFirestore.js";

const products = [];

export const ProductRepository = {

    createLocal(data) {

        const product = buildProduct(data);

        products.push(product);

        return product;

    },

    allLocal() {

        return products;

    },

    findLocal(id) {

        return products.find(product => product.id === id);

    },

    async createCloud(data) {

        const product = buildProduct(data);

        return await createProductCloud(product);

    },

    async allCloud() {

        return await getProductsCloud();

    },

    async findCloud(id) {

        return await getProductCloud(id);

    },

    async updateCloud(id, updates) {

        return await updateProductCloud(id, updates);

    },

    async deleteCloud(id) {

        return await deleteProductCloud(id);

    }

};
