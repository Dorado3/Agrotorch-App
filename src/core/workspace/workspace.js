/*
 * AgroTorch Workspace Engine
 */
import { auth } from "../config/firebase.js";
import { getUserFarms } from "../../firestore/FarmFirestore.js";
import { getFarms, saveFarm } from "../../services/farmStorage.js";
import { ActivityRepository } from "../../repositories/ActivityRepository.js";
import { ExpenseRepository } from "../../repositories/ExpenseRepository.js";
import { HarvestRepository } from "../../repositories/HarvestRepository.js";
import { SalesRepository } from "../../repositories/SalesRepository.js";
import { TaskRepository } from "../../repositories/TaskRepository.js";
import { mergeCloudActivities } from "../../services/activityStorage.js";
import { mergeCloudExpenses } from "../../services/expenseStorage.js";
import { mergeCloudHarvests } from "../../services/harvestStorage.js";
import { mergeCloudSales } from "../../services/salesStorage.js";

const workspace = { user: null, farms: [], activeFarm: null };

async function hydrateOperationalRecords() {
  const loaders = [
    [ActivityRepository, mergeCloudActivities],
    [ExpenseRepository, mergeCloudExpenses],
    [HarvestRepository, mergeCloudHarvests],
    [SalesRepository, mergeCloudSales],
    [TaskRepository, records => TaskRepository.mergeCloud(records)]
  ];

  await Promise.allSettled(loaders.map(([repo]) => repo.syncPendingCloud()));
  const results = await Promise.allSettled(loaders.map(([repo]) => repo.allCloud()));
  results.forEach((result, index) => {
    if (result.status === "fulfilled") loaders[index][1](result.value);
    else console.warn("Could not sync one operational record collection:", result.reason);
  });
}

export async function loadWorkspace() {
  const user = auth.currentUser;
  if (!user) {
    workspace.user = null;
    workspace.farms = [];
    workspace.activeFarm = null;
    return workspace;
  }

  workspace.user = user;
  try {
    workspace.farms = await getUserFarms(user.uid);
    workspace.farms.forEach(farm => saveFarm({ ...farm, id: farm.id, ownerId: user.uid }));
  } catch (error) {
    console.warn("Cloud farm list unavailable; using this device's farm cache:", error);
    workspace.farms = getFarms();
  }

  workspace.activeFarm = workspace.farms.length ? workspace.farms[0] : null;
  await hydrateOperationalRecords();
  return workspace;
}

export function getWorkspace() { return workspace; }
export function setActiveFarm(farm) { workspace.activeFarm = farm; }
