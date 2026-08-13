/*
----------------------------------------------------
AgroTorch Daily Task Synchronization
Version 1.0.0
----------------------------------------------------
*/

import { TaskRepository } from "../../repositories/TaskRepository.js";

export function syncDailyTasks(tasks = [], farmId) {

    if (!farmId) {
        return tasks;
    }

    return tasks.map(task => {

        const existing =
            TaskRepository
                .farmTasks(farmId)
                .find(existingTask =>
                    existingTask.id === task.id
                );

        if (existing) {

            return {
                ...task,
                ...existing
            };

        }

        const storedTask = {
            ...task,
            farmId,
            completed: false,
            status: "PENDING"
        };

        TaskRepository.save(storedTask);

        return storedTask;

    });

}
