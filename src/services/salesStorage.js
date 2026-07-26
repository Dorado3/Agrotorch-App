const STORAGE_KEY = "agrotorch_sales";

export function getSales() {

    const sales = localStorage.getItem(STORAGE_KEY);

    return sales ? JSON.parse(sales) : [];

}

export function saveSale(sale) {

    const sales = getSales();

    sale.id = Date.now();

    sales.push(sale);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sales)
    );

}

export function deleteSale(id) {

    const sales = getSales().filter(
        sale => sale.id !== id
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sales)
    );

}

export function clearSales() {

    localStorage.removeItem(STORAGE_KEY);

}
