import { getCurrentUserId } from "./userService.js";
import { mergeUserRecords } from "./cloudRecordSync.js";
const KEY = "agrotorch_expenses";
const read = () => { try { const x = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(x) ? x : []; } catch { return []; } };
export function getExpenses() { const uid = getCurrentUserId(); return read().filter(x => x.userId === uid); }
export function getFarmExpenses(farmId) { return getExpenses().filter(x => x.farmId === farmId); }
export function saveExpense(record) {
  const all = read(); const now = new Date().toISOString();
  Object.assign(record, { id: crypto.randomUUID(), userId: getCurrentUserId(), createdAt: now, updatedAt: now, syncStatus: "PENDING" });
  all.push(record); localStorage.setItem(KEY, JSON.stringify(all)); return record;
}
export function markExpenseSynced(id, cloudId) { const all = read(); const x = all.find(r => r.id === id && r.userId === getCurrentUserId()); if (x) Object.assign(x, { syncStatus: "SYNCED", cloudId, updatedAt: new Date().toISOString() }); localStorage.setItem(KEY, JSON.stringify(all)); }
export function mergeCloudExpenses(records) { mergeUserRecords(KEY, records, getCurrentUserId()); }
export function deleteExpense(id) { const uid = getCurrentUserId(); localStorage.setItem(KEY, JSON.stringify(read().filter(x => !(x.id === id && x.userId === uid)))); }
export function clearExpenses() { const uid = getCurrentUserId(); localStorage.setItem(KEY, JSON.stringify(read().filter(x => x.userId !== uid))); }
