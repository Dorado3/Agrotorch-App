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
    return payments.find(payment => payment.id === id);
  },
  findByOrder(orderId) {
    return payments.find(payment => payment.orderId === orderId);
  },
  async createCloud(data) {
    const payment = buildPayment(data);
    return createPaymentCloud(payment);
  },
  async allCloud() {
    return getPaymentsCloud();
  },
  async findCloud(id) {
    return getPaymentCloud(id);
  },
  async updateCloud(id, updates) {
    return updatePaymentCloud(id, updates);
  },
  async deleteCloud(id) {
    return deletePaymentCloud(id);
  }
};
