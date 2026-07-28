/*
----------------------------------------------------
AgroTorch Repository
Sales Repository
Version 2.0.0
----------------------------------------------------
*/

import {

    getSales,

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
