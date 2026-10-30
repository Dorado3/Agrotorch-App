import { getSales, getFarmSales, saveSale, deleteSale } from "../services/salesStorage.js";
import { saveSaleCloud, getSalesCloud, deleteSaleCloud } from "../firestore/SalesFirestore.js";
import { isToday } from "../core/date/isToday.js";

export const SalesRepository = {
  all() { return getSales(); },
  farmSales(farmId) { return getFarmSales(farmId); },
  todaySales(farmId) {
    return getFarmSales(farmId).filter(item => isToday(item.createdAt || item.date || item.timestamp));
  },
  async allCloud() { return getSalesCloud(); },
  async create(sale) {
    saveSale(sale);
    return saveSaleCloud(sale);
  },
  async delete(id) {
    deleteSale(id);
    return deleteSaleCloud(id);
  }
};
