/*
----------------------------------------------------
AgroTorch Repository
Sales Repository
Version 3.0.0
----------------------------------------------------
*/

import {

    getSales,

    getFarmSales,

    saveSale,

    deleteSale

} from "../services/salesStorage.js";

import {

    saveSaleCloud,

    getSalesCloud

} from "../firestore/SalesFirestore.js";

export const SalesRepository = {

    all() {

        return getSales();

    },

    farmSales(farmId) {

        return getFarmSales(farmId);

    },

    async allCloud() {

        return await getSalesCloud();

    },

    async create(sale) {

        saveSale(sale);

        return await saveSaleCloud(sale);

    },

    delete(id) {

        return deleteSale(id);

    }

};
