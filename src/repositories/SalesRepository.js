import { getSales, getFarmSales, saveSale, deleteSale, markSaleSynced } from "../services/salesStorage.js";
import { saveSaleCloud, getSalesCloud, deleteSaleCloud } from "../firestore/SalesFirestore.js";
import { isToday } from "../core/date/isToday.js";
async function syncOne(record) { const ref = await saveSaleCloud(record); markSaleSynced(record.id, ref.id); }
export const SalesRepository = {
  all() { return getSales(); },
  farmSales(farmId) { return getFarmSales(farmId); },
  todaySales(farmId) { return getFarmSales(farmId).filter(x => isToday(x.createdAt || x.date || x.timestamp)); },
  async allCloud() { return getSalesCloud(); },
  async create(record) { const saved = saveSale(record); try { await syncOne(saved); return { synced: true, record: saved }; } catch (error) { return { synced: false, record: saved, error }; } },
  async syncPendingCloud() { for (const record of getSales().filter(x => x.syncStatus !== "SYNCED")) await syncOne(record); },
  async delete(id) { await deleteSaleCloud(id); deleteSale(id); }
};
