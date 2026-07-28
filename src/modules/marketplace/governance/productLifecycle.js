/*
----------------------------------------------------
AgroTorch Marketplace
Product Lifecycle Engine
Version 1.0.0
----------------------------------------------------
*/

export const PRODUCT_STATUS = {

    DRAFT: "draft",

    PENDING: "pending",

    APPROVED: "approved",

    PUBLISHED: "published",

    LOW_STOCK: "low_stock",

    OUT_OF_STOCK: "out_of_stock",

    EXPIRED: "expired",

    ARCHIVED: "archived",

    HIDDEN: "hidden",

    REJECTED: "rejected",

    DELETED: "deleted"

};

export function canPublish(product) {

    return product.status === PRODUCT_STATUS.APPROVED;

}

export function isExpired(product) {

    return new Date(product.expiryDate) < new Date();

}

export function shouldArchive(product) {

    return product.status === PRODUCT_STATUS.EXPIRED;

}
