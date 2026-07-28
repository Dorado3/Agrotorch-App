/*
----------------------------------------------------
AgroTorch Marketplace
Product Service
Version 1.0.0
----------------------------------------------------
*/

import { createProduct } from "./product.model.js";

import { validateProduct } from "./product.validator.js";

export function buildProduct(data = {}) {

    const product = createProduct(data);

    validateProduct(product);

    return product;

}
