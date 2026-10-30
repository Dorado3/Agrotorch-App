/*
 * AgroTorch local farm cache, scoped to the authenticated Firebase UID.
 */
import { getCurrentUserId } from "./userService.js";

const STORAGE_KEY = "agrotorch_farms";

function readFarms() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function getFarms() {
  const userId = getCurrentUserId();
  if (!userId) return [];
  return readFarms().filter(farm => farm.userId === userId || farm.ownerId === userId);
}

export function saveFarm(farm) {
  const userId = getCurrentUserId();
  if (!userId) throw new Error("Sign in before saving a farm.");
  const farms = readFarms();
  const record = { ...farm, userId };
  const index = farms.findIndex(item => item.id && item.id === record.id && item.userId === userId);
  if (index >= 0) farms[index] = { ...farms[index], ...record };
  else farms.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(farms));
  return record;
}

export function deleteFarm(index) {
  const farms = readFarms();
  const mine = farms.filter(farm => farm.userId === getCurrentUserId());
  const target = mine[index];
  if (!target) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(farms.filter(farm => farm !== target)));
}

export function updateFarm(index, newFarm) {
  const farms = readFarms();
  const mine = farms.filter(farm => farm.userId === getCurrentUserId());
  const target = mine[index];
  if (!target) return;
  const position = farms.indexOf(target);
  farms[position] = { ...target, ...newFarm, userId: getCurrentUserId() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(farms));
  return farms[position];
}

export function clearFarms() {
  const userId = getCurrentUserId();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readFarms().filter(farm => farm.userId !== userId)));
}
