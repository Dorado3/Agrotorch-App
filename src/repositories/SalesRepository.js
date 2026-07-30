/*
----------------------------------------------------
AgroTorch Repository
Sales Repository
Version 3.1.0
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

import { isToday } from "../core/date/isToday.js";

export const SalesRepository = {

    all() {

        return getSales();

    },

    farmSales(farmId) {

        return getFarmSales(farmId);

    },

    todaySales(farmId) {

        return getFarmSales(farmId)

            .filter(sale =>

                isToday(

                    sale.createdAt ||

                    sale.date ||

                    sale.timestamp

                )

            );

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
