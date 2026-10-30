/*
----------------------------------------------------
AgroTorch Activity Storage
Version 3.1.0
----------------------------------------------------
*/
import { getCurrentUserId } from "./userService.js";
import { mergeUserRecords } from "./cloudRecordSync.js";

const STORAGE_KEY = "agrotorch_activities";

export function getActivities() {
  const activities = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const userId = getCurrentUserId();
  return activities.filter(activity => activity.userId === userId);
}

export function getFarmActivities(farmId) {
  return getActivities().filter(activity => activity.farmId === farmId);
}

export function saveActivity(activity) {
  const activities = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  activity.id = crypto.randomUUID();
  activity.userId = getCurrentUserId();
  activity.createdAt = new Date().toISOString();
  activity.updatedAt = new Date().toISOString();
  activities.push(activity);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  return activity;
}

export function mergeCloudActivities(records) {
  mergeUserRecords(STORAGE_KEY, records, getCurrentUserId());
}

export function deleteActivity(id) {
  const activities = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities.filter(item => item.id !== id)));
}

export function clearActivities() {
  const userId = getCurrentUserId();
  const activities = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities.filter(item => item.userId !== userId)));
}
