/*
----------------------------------------------------
AgroTorch Marketplace
Payment Controller
Version 1.0.0
----------------------------------------------------
*/

import { PaymentRepository } from "./payment.repository.js";

export const PaymentController = {

    async createPayment(data) {

        return await PaymentRepository.createCloud(data);

    },

    async getPayments() {

        return await PaymentRepository.allCloud();

    },

    async getPayment(id) {

        return await PaymentRepository.findCloud(id);

    },

    async updatePayment(id, updates) {

        return await PaymentRepository.updateCloud(

            id,

            updates

        );

    },

    async deletePayment(id) {

        return await PaymentRepository.deleteCloud(id);

    }

};
