/*
----------------------------------------------------
AgroTorch Marketplace
Payment Repository
Version 2.0.0
----------------------------------------------------
*/

import { buildPayment } from "./payment.service.js";

import {

    createPaymentCloud,

    getPaymentsCloud,

    getPaymentCloud,

    updatePaymentCloud,

    deletePaymentCloud

} from "../firestore/PaymentFirestore.js";

const payments = [];

export const PaymentRepository = {

    createLocal(data) {

        const payment = buildPayment(data);

        payments.push(payment);

        return payment;

    },

    allLocal() {

        return payments;

    },

    findLocal(id) {

        return payments.find(

            payment => payment.id === id

        );

    },

    findByOrder(orderId) {

        return payments.find(

            payment => payment.orderId === orderId

        );

    },

    async createCloud(data) {

        const payment = buildPayment(data);

        return await createPaymentCloud(payment);

    },

    async allCloud() {

        return await getPaymentsCloud();

    },

    async findCloud(id) {

        return await getPaymentCloud(id);

    },

    async updateCloud(id, updates) {

        return await updatePaymentCloud(id, updates);

    },

    async deleteCloud(id) {

        return await deletePaymentCloud(id);

    }

};
EOF.
cat > src/modules/marketplace/payment/payment.repository.js << 'EOF'
/*
----------------------------------------------------
AgroTorch Marketplace
Payment Repository
Version 2.0.0
----------------------------------------------------
*/

import { buildPayment } from "./payment.service.js";

import {

    createPaymentCloud,

    getPaymentsCloud,

    getPaymentCloud,

    updatePaymentCloud,

    deletePaymentCloud

} from "../firestore/PaymentFirestore.js";

const payments = [];

export const PaymentRepository = {

    createLocal(data) {

        const payment = buildPayment(data);

        payments.push(payment);

        return payment;

    },

    allLocal() {

        return payments;

    },

    findLocal(id) {

        return payments.find(

            payment => payment.id === id

        );

    },

    findByOrder(orderId) {

        return payments.find(

            payment => payment.orderId === orderId

        );

    },

    async createCloud(data) {

        const payment = buildPayment(data);

        return await createPaymentCloud(payment);

    },

    async allCloud() {

        return await getPaymentsCloud();

    },

    async findCloud(id) {

        return await getPaymentCloud(id);

    },

    async updateCloud(id, updates) {

        return await updatePaymentCloud(id, updates);

    },

    async deleteCloud(id) {

        return await deletePaymentCloud(id);

    }

};
