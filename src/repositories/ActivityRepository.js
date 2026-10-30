import { getActivities, saveActivity, getFarmActivities, deleteActivity, markActivitySynced } from "../services/activityStorage.js";
import { saveActivityCloud, getActivitiesCloud, getFarmActivitiesCloud, deleteActivityCloud } from "../firestore/ActivityFirestore.js";
import { isToday } from "../core/date/isToday.js";
async function syncOne(record) { const ref = await saveActivityCloud(record); markActivitySynced(record.id, ref.id); }
export const ActivityRepository = {
  all() { return getActivities(); },
  async allCloud() { return getActivitiesCloud(); },
  async create(record) { const saved = saveActivity(record); try { await syncOne(saved); return { synced: true, record: saved }; } catch (error) { return { synced: false, record: saved, error }; } },
  async syncPendingCloud() { for (const record of getActivities().filter(x => x.syncStatus !== "SYNCED")) await syncOne(record); },
  farmActivities(farmId) { return getFarmActivities(farmId); },
  todayActivities(farmId) { return getFarmActivities(farmId).filter(x => isToday(x.createdAt || x.date || x.timestamp)); },
  async farmActivitiesCloud(farmId) { return getFarmActivitiesCloud(farmId); },
  async delete(id) { await deleteActivityCloud(id); deleteActivity(id); }
};
