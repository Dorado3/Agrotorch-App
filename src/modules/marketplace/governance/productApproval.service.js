/*
----------------------------------------------------
AgroTorch Marketplace
Product Approval Service
Version 1.0.0
----------------------------------------------------
*/

import {

    PRODUCT_STATUS

} from "./productLifecycle.js";

export function approveProduct(product) {

    product.status = PRODUCT_STATUS.APPROVED;

    return product;

}

export function rejectProduct(product) {

    product.status = PRODUCT_STATUS.REJECTED;

    return product;

}

export function publishProduct(product) {

    product.status = PRODUCT_STATUS.PUBLISHED;

    return product;

}

export function archiveProduct(product) {

    product.status = PRODUCT_STATUS.ARCHIVED;

    return product;

}
