import { getCurrentUserId } from "./userService.js";
import { mergeUserRecords } from "./cloudRecordSync.js";
const KEY = "agrotorch_sales";
const read = () => { try { const x = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(x) ? x : []; } catch { return []; } };
export function getSales() { const uid = getCurrentUserId(); return read().filter(x => x.userId === uid); }
export function getFarmSales(farmId) { return getSales().filter(x => x.farmId === farmId); }
export function saveSale(record) {
  const all = read(); const now = new Date().toISOString();
  Object.assign(record, { id: crypto.randomUUID(), userId: getCurrentUserId(), createdAt: now, updatedAt: now, syncStatus: "PENDING" });
  all.push(record); localStorage.setItem(KEY, JSON.stringify(all)); return record;
}
export function markSaleSynced(id, cloudId) { const all = read(); const x = all.find(r => r.id === id && r.userId === getCurrentUserId()); if (x) Object.assign(x, { syncStatus: "SYNCED", cloudId, updatedAt: new Date().toISOString() }); localStorage.setItem(KEY, JSON.stringify(all)); }
export function mergeCloudSales(records) { mergeUserRecords(KEY, records, getCurrentUserId()); }
export function deleteSale(id) { const uid = getCurrentUserId(); localStorage.setItem(KEY, JSON.stringify(read().filter(x => !(x.id === id && x.userId === uid)))); }
export function clearSales() { const uid = getCurrentUserId(); localStorage.setItem(KEY, JSON.stringify(read().filter(x => x.userId !== uid))); }
