/*
----------------------------------------------------
AgroTorch Marketplace
Product Controller
Version 1.0.0
----------------------------------------------------
*/

import { ProductRepository } from "./product.repository.js";

export const ProductController = {

    async createProduct(data) {

        return await ProductRepository.createCloud(data);

    },

    async getProducts() {

        return await ProductRepository.allCloud();

    },

    async getProduct(id) {

        return await ProductRepository.findCloud(id);

    },

    async updateProduct(id, updates) {

        return await ProductRepository.updateCloud(

            id,

            updates

        );

    },

    async deleteProduct(id) {

        return await ProductRepository.deleteCloud(id);

    }

};
