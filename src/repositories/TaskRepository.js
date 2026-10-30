/*
 * User-scoped task persistence with Firestore sync.
 */
import { getCurrentUserId } from "../services/userService.js";
import { saveTaskCloud, getTasksCloud } from "../firestore/TaskFirestore.js";

const STORAGE_KEY = "agrotorch_tasks";
function readAll() {
  try {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}
function saveAll(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
function currentTasks() {
  const uid = getCurrentUserId();
  return uid ? readAll().filter(task => task.userId === uid) : [];
}
function updateTask(task) {
  const all = readAll();
  const uid = getCurrentUserId();
  const index = all.findIndex(item => item.userId === uid && item.id === task.id);
  if (index >= 0) all[index] = { ...all[index], ...task };
  else all.push({ ...task, userId: uid });
  saveAll(all);
}
async function syncOne(task) {
  const reference = await saveTaskCloud(task);
  const all = readAll();
  const uid = getCurrentUserId();
  const local = all.find(item => item.userId === uid && item.id === task.id);
  if (local) {
    local.syncStatus = "SYNCED";
    local.cloudId = reference.id;
    local.updatedAt = new Date().toISOString();
    saveAll(all);
  }
}

export const TaskRepository = {
  all() {
    return currentTasks();
  },
  farmTasks(farmId) {
    return currentTasks().filter(task => task.farmId === farmId);
  },
  pendingTasks(farmId) {
    return currentTasks().filter(task => task.farmId === farmId && !task.completed);
  },
  completedTasks(farmId) {
    return currentTasks().filter(task => task.farmId === farmId && task.completed);
  },
  save(task) {
    const uid = getCurrentUserId();
    if (!uid) return task;
    const saved = { ...task, userId: uid, syncStatus: "PENDING", updatedAt: new Date().toISOString() };
    updateTask(saved);
    // Best-effort immediate sync; failed writes remain queued for the next reconnect.
    syncOne(saved).catch(() => {});
    return saved;
  },
  complete(taskId, data = {}) {
    const task = currentTasks().find(item => item.id === taskId);
    if (!task) return null;
    const completed = {
      ...task,
      completed: true,
      status: "COMPLETED",
      completedAt: new Date().toISOString(),
      evidence: data,
      syncStatus: "PENDING"
    };
    updateTask(completed);
    syncOne(completed).catch(() => {});
    return completed;
  },
  async syncPendingCloud() {
    const pending = currentTasks().filter(task => task.syncStatus !== "SYNCED");
    for (const task of pending) await syncOne(task);
  },
  async allCloud() {
    return getTasksCloud();
  },
  mergeCloud(records = []) {
    const uid = getCurrentUserId();
    if (!uid) return;
    const all = readAll();
    const mine = new Map(all.filter(task => task.userId === uid && task.id).map(task => [task.id, task]));
    for (const record of records) {
      if (!record?.id || record.userId !== uid) continue;
      const local = mine.get(record.id);
      if (local?.syncStatus === "PENDING") continue;
      mine.set(record.id, { ...local, ...record, userId: uid, syncStatus: "SYNCED" });
    }
    const others = all.filter(task => task.userId !== uid);
    saveAll([...others, ...mine.values()]);
  }
};
