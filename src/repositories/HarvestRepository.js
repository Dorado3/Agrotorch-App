import { getHarvests, getFarmHarvests, saveHarvest, deleteHarvest } from "../services/harvestStorage.js";
import { saveHarvestCloud, getHarvestsCloud, deleteHarvestCloud } from "../firestore/HarvestFirestore.js";
import { isToday } from "../core/date/isToday.js";

export const HarvestRepository = {
  all() { return getHarvests(); },
  farmHarvests(farmId) { return getFarmHarvests(farmId); },
  todayHarvests(farmId) {
    return getFarmHarvests(farmId).filter(item => isToday(item.createdAt || item.date || item.timestamp));
  },
  async allCloud() { return getHarvestsCloud(); },
  async create(harvest) {
    saveHarvest(harvest);
    return saveHarvestCloud(harvest);
  },
  async delete(id) {
    deleteHarvest(id);
    return deleteHarvestCloud(id);
  }
};
