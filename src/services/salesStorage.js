import { getCurrentUserId } from "./userService.js";

const STORAGE_KEY = "agrotorch_sales";

export function getSales() {

    const sales =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId = getCurrentUserId();

    return sales.filter(sale => sale.userId === userId);

}

export function saveSale(sale) {

    const sales =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    sale.id = Date.now();

    sale.userId = getCurrentUserId();

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
        sales.filter(sale => {

            return !(
                sale.id === id &&
                sale.userId === getCurrentUserId()
            );

        });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );

}

export function clearSales() {

    localStorage.removeItem(STORAGE_KEY);

}
