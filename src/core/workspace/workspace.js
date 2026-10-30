/*
 * AgroTorch Workspace Engine
 */
import { auth } from "../config/firebase.js";
import { getUserFarms } from "../../firestore/FarmFirestore.js";
import { saveFarm } from "../../services/farmStorage.js";
import { ActivityRepository } from "../../repositories/ActivityRepository.js";
import { ExpenseRepository } from "../../repositories/ExpenseRepository.js";
import { HarvestRepository } from "../../repositories/HarvestRepository.js";
import { SalesRepository } from "../../repositories/SalesRepository.js";
import { mergeCloudActivities } from "../../services/activityStorage.js";
import { mergeCloudExpenses } from "../../services/expenseStorage.js";
import { mergeCloudHarvests } from "../../services/harvestStorage.js";
import { mergeCloudSales } from "../../services/salesStorage.js";

const workspace = { user: null, farms: [], activeFarm: null };

async function hydrateOperationalRecords() {
  const loaders = [
    [ActivityRepository.allCloud, mergeCloudActivities],
    [ExpenseRepository.allCloud, mergeCloudExpenses],
    [HarvestRepository.allCloud, mergeCloudHarvests],
    [SalesRepository.allCloud, mergeCloudSales]
  ];

  const results = await Promise.allSettled(loaders.map(([load]) => load()));
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
  workspace.farms = await getUserFarms(user.uid);
  workspace.farms.forEach(farm => saveFarm({ ...farm, id: farm.id, ownerId: user.uid }));
  workspace.activeFarm = workspace.farms.length ? workspace.farms[0] : null;

  // Keep local-first screens populated with this user's cloud records on every login.
  await hydrateOperationalRecords();
  return workspace;
}

export function getWorkspace() {
  return workspace;
}

export function setActiveFarm(farm) {
  workspace.activeFarm = farm;
}
