/*
----------------------------------------------------
AgroTorch Sales Storage
Version 3.1.0
----------------------------------------------------
*/
import { getCurrentUserId } from "./userService.js";
import { mergeUserRecords } from "./cloudRecordSync.js";

const STORAGE_KEY = "agrotorch_sales";

export function getSales() {
  const sales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const userId = getCurrentUserId();
  return sales.filter(sale => sale.userId === userId);
}

export function getFarmSales(farmId) {
  return getSales().filter(sale => sale.farmId === farmId);
}

export function saveSale(sale) {
  const sales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  sale.id = crypto.randomUUID();
  sale.userId = getCurrentUserId();
  sale.createdAt = new Date().toISOString();
  sale.updatedAt = new Date().toISOString();
  sales.push(sale);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
  return sale;
}

export function mergeCloudSales(records) {
  mergeUserRecords(STORAGE_KEY, records, getCurrentUserId());
}

export function deleteSale(id) {
  const sales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sales.filter(item => item.id !== id)));
}

export function clearSales() {
  const userId = getCurrentUserId();
  const sales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sales.filter(item => item.userId !== userId)));
}
