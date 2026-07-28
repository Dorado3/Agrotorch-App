/*
----------------------------------------------------
AgroTorch Marketplace
Product Validator
Version 1.0.0
----------------------------------------------------
*/

export function validateProduct(product) {

    if (!product.storeId) {

        throw new Error("Store ID is required.");

    }

    if (!product.name) {

        throw new Error("Product name is required.");

    }

    if (product.price < 0) {

        throw new Error("Invalid product price.");

    }

    return true;

}
