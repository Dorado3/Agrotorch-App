/*
----------------------------------------------------
AgroTorch Sales Storage
Version 3.0.0
----------------------------------------------------
*/

import { getCurrentUserId } from "./userService.js";

const STORAGE_KEY = "agrotorch_sales";

export function getSales() {

    const sales =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId =
        getCurrentUserId();

    return sales.filter(sale =>
        sale.userId === userId
    );

}

export function getFarmSales(farmId) {

    return getSales().filter(sale =>
        sale.farmId === farmId
    );

}

export function saveSale(sale) {

    const sales =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    sale.id =
        crypto.randomUUID();

    sale.userId =
        getCurrentUserId();

    sale.createdAt =
        new Date().toISOString();

    sale.updatedAt =
        new Date().toISOString();

    sales.push(sale);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sales)
    );

}

export function deleteSale(id) {

    const sales =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const updated =
        sales.filter(sale =>
            sale.id !== id
        );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );

}

export function clearSales() {

    localStorage.removeItem(STORAGE_KEY);

}
