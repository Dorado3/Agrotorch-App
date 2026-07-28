/*
----------------------------------------------------
AgroTorch Marketplace
Payment Validator
Version 1.0.0
----------------------------------------------------
*/

export function validatePayment(payment) {

    if (!payment.orderId) {

        throw new Error("Order ID is required.");

    }

    if (!payment.customerId) {

        throw new Error("Customer ID is required.");

    }

    if (payment.amount <= 0) {

        throw new Error("Invalid payment amount.");

    }

    return true;

}
