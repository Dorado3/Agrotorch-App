import { getHarvests, getFarmHarvests, saveHarvest, deleteHarvest, markHarvestSynced } from "../services/harvestStorage.js";
import { saveHarvestCloud, getHarvestsCloud, deleteHarvestCloud } from "../firestore/HarvestFirestore.js";
import { isToday } from "../core/date/isToday.js";
async function syncOne(record) { const ref = await saveHarvestCloud(record); markHarvestSynced(record.id, ref.id); }
export const HarvestRepository = {
  all() { return getHarvests(); },
  farmHarvests(farmId) { return getFarmHarvests(farmId); },
  todayHarvests(farmId) { return getFarmHarvests(farmId).filter(x => isToday(x.createdAt || x.date || x.timestamp)); },
  async allCloud() { return getHarvestsCloud(); },
  async create(record) { const saved = saveHarvest(record); try { await syncOne(saved); return { synced: true, record: saved }; } catch (error) { return { synced: false, record: saved, error }; } },
  async syncPendingCloud() { for (const record of getHarvests().filter(x => x.syncStatus !== "SYNCED")) await syncOne(record); },
  async delete(id) { await deleteHarvestCloud(id); deleteHarvest(id); }
};
