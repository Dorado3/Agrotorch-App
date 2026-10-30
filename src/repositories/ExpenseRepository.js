import { getExpenses, getFarmExpenses, saveExpense, deleteExpense } from "../services/expenseStorage.js";
import { saveExpenseCloud, getExpensesCloud, deleteExpenseCloud } from "../firestore/ExpenseFirestore.js";
import { isToday } from "../core/date/isToday.js";

export const ExpenseRepository = {
  all() { return getExpenses(); },
  farmExpenses(farmId) { return getFarmExpenses(farmId); },
  todayExpenses(farmId) {
    return getFarmExpenses(farmId).filter(item => isToday(item.createdAt || item.date || item.timestamp));
  },
  async allCloud() { return getExpensesCloud(); },
  async create(expense) {
    saveExpense(expense);
    return saveExpenseCloud(expense);
  },
  async delete(id) {
    deleteExpense(id);
    return deleteExpenseCloud(id);
  }
};
