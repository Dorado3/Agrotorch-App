import { getExpenses, getFarmExpenses, saveExpense, deleteExpense, markExpenseSynced } from "../services/expenseStorage.js";
import { saveExpenseCloud, getExpensesCloud, deleteExpenseCloud } from "../firestore/ExpenseFirestore.js";
import { isToday } from "../core/date/isToday.js";
async function syncOne(record) { const ref = await saveExpenseCloud(record); markExpenseSynced(record.id, ref.id); }
export const ExpenseRepository = {
  all() { return getExpenses(); },
  farmExpenses(farmId) { return getFarmExpenses(farmId); },
  todayExpenses(farmId) { return getFarmExpenses(farmId).filter(x => isToday(x.createdAt || x.date || x.timestamp)); },
  async allCloud() { return getExpensesCloud(); },
  async create(record) { const saved = saveExpense(record); try { await syncOne(saved); return { synced: true, record: saved }; } catch (error) { return { synced: false, record: saved, error }; } },
  async syncPendingCloud() { for (const record of getExpenses().filter(x => x.syncStatus !== "SYNCED")) await syncOne(record); },
  async delete(id) { await deleteExpenseCloud(id); deleteExpense(id); }
};
