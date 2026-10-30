/*
----------------------------------------------------
AgroTorch Harvest Storage
Version 3.1.0
----------------------------------------------------
*/
import { getCurrentUserId } from "./userService.js";
import { mergeUserRecords } from "./cloudRecordSync.js";

const STORAGE_KEY = "agrotorch_harvests";

export function getHarvests() {
  const harvests = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const userId = getCurrentUserId();
  return harvests.filter(harvest => harvest.userId === userId);
}

export function getFarmHarvests(farmId) {
  return getHarvests().filter(harvest => harvest.farmId === farmId);
}

export function saveHarvest(harvest) {
  const harvests = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  harvest.id = crypto.randomUUID();
  harvest.userId = getCurrentUserId();
  harvest.createdAt = new Date().toISOString();
  harvest.updatedAt = new Date().toISOString();
  harvests.push(harvest);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(harvests));
  return harvest;
}

export function mergeCloudHarvests(records) {
  mergeUserRecords(STORAGE_KEY, records, getCurrentUserId());
}

export function deleteHarvest(id) {
  const harvests = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(harvests.filter(item => item.id !== id)));
}

export function clearHarvests() {
  const userId = getCurrentUserId();
  const harvests = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(harvests.filter(item => item.userId !== userId)));
}
