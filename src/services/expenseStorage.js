/*
----------------------------------------------------
AgroTorch Expense Storage
Version 3.1.0
----------------------------------------------------
*/
import { getCurrentUserId } from "./userService.js";
import { mergeUserRecords } from "./cloudRecordSync.js";

const STORAGE_KEY = "agrotorch_expenses";

export function getExpenses() {
  const expenses = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const userId = getCurrentUserId();
  return expenses.filter(expense => expense.userId === userId);
}

export function getFarmExpenses(farmId) {
  return getExpenses().filter(expense => expense.farmId === farmId);
}

export function saveExpense(expense) {
  const expenses = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  expense.id = crypto.randomUUID();
  expense.userId = getCurrentUserId();
  expense.createdAt = new Date().toISOString();
  expense.updatedAt = new Date().toISOString();
  expenses.push(expense);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  return expense;
}

export function mergeCloudExpenses(records) {
  mergeUserRecords(STORAGE_KEY, records, getCurrentUserId());
}

export function deleteExpense(id) {
  const expenses = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses.filter(item => item.id !== id)));
}

export function clearExpenses() {
  const userId = getCurrentUserId();
  const expenses = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses.filter(item => item.userId !== userId)));
}
