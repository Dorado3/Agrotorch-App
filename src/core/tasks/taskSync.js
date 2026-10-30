/*
 * Keep one task instance per farm, task definition and local calendar day.
 */
import { TaskRepository } from "../../repositories/TaskRepository.js";

export function syncDailyTasks(tasks = [], farmId) {
  if (!farmId) return tasks;
  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
  const existingTasks = TaskRepository.farmTasks(farmId);

  return tasks.map(task => {
    const dailyId = farmId + ":" + today + ":" + task.id;
    const existing = existingTasks.find(item => item.id === dailyId);
    if (existing) return { ...task, ...existing };

    const storedTask = {
      ...task,
      id: dailyId,
      sourceTaskId: task.id,
      farmId,
      dueDate: today,
      completed: false,
      status: "PENDING"
    };
    TaskRepository.save(storedTask);
    return storedTask;
  });
}
