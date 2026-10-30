import { getCurrentUserId } from "./userService.js";
import { mergeUserRecords } from "./cloudRecordSync.js";
const KEY = "agrotorch_harvests";
const read = () => { try { const x = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(x) ? x : []; } catch { return []; } };
export function getHarvests() { const uid = getCurrentUserId(); return read().filter(x => x.userId === uid); }
export function getFarmHarvests(farmId) { return getHarvests().filter(x => x.farmId === farmId); }
export function saveHarvest(record) {
  const all = read(); const now = new Date().toISOString();
  Object.assign(record, { id: crypto.randomUUID(), userId: getCurrentUserId(), createdAt: now, updatedAt: now, syncStatus: "PENDING" });
  all.push(record); localStorage.setItem(KEY, JSON.stringify(all)); return record;
}
export function markHarvestSynced(id, cloudId) { const all = read(); const x = all.find(r => r.id === id && r.userId === getCurrentUserId()); if (x) Object.assign(x, { syncStatus: "SYNCED", cloudId, updatedAt: new Date().toISOString() }); localStorage.setItem(KEY, JSON.stringify(all)); }
export function mergeCloudHarvests(records) { mergeUserRecords(KEY, records, getCurrentUserId()); }
export function deleteHarvest(id) { const uid = getCurrentUserId(); localStorage.setItem(KEY, JSON.stringify(read().filter(x => !(x.id === id && x.userId === uid)))); }
export function clearHarvests() { const uid = getCurrentUserId(); localStorage.setItem(KEY, JSON.stringify(read().filter(x => x.userId !== uid))); }
