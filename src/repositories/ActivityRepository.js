import { getActivities, saveActivity, getFarmActivities, deleteActivity } from "../services/activityStorage.js";
import { saveActivityCloud, getActivitiesCloud, getFarmActivitiesCloud, deleteActivityCloud } from "../firestore/ActivityFirestore.js";
import { isToday } from "../core/date/isToday.js";

export const ActivityRepository = {
  all() { return getActivities(); },
  async allCloud() { return getActivitiesCloud(); },
  async create(activity) {
    saveActivity(activity);
    return saveActivityCloud(activity);
  },
  farmActivities(farmId) { return getFarmActivities(farmId); },
  todayActivities(farmId) {
    return getFarmActivities(farmId).filter(item => isToday(item.createdAt || item.date || item.timestamp));
  },
  async farmActivitiesCloud(farmId) { return getFarmActivitiesCloud(farmId); },
  async delete(id) {
    deleteActivity(id);
    return deleteActivityCloud(id);
  }
};
