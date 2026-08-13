/*
----------------------------------------------------
AgroTorch Task Repository
Version 2.0.0
Persistent Task Storage
----------------------------------------------------
*/

const STORAGE_KEY =
    "agrotorch_tasks";

function loadTasks() {

    try {

        return JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

    } catch {

        return [];

    }

}

function saveTasks(tasks) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );

}

export const TaskRepository = {

    all() {

        return loadTasks();

    },

    farmTasks(farmId) {

        return loadTasks().filter(
            task => task.farmId === farmId
        );

    },

    pendingTasks(farmId) {

        return loadTasks().filter(
            task =>
                task.farmId === farmId &&
                !task.completed
        );

    },

    completedTasks(farmId) {

        return loadTasks().filter(
            task =>
                task.farmId === farmId &&
                task.completed
        );

    },

    save(task) {

        const tasks = loadTasks();

        const existing =
            tasks.findIndex(
                t =>
                    t.farmId === task.farmId &&
                    t.id === task.id
            );

        if (existing >= 0) {

            tasks[existing] = {
                ...tasks[existing],
                ...task
            };

        } else {

            tasks.push(task);

        }

        saveTasks(tasks);

        return task;

    },

    complete(taskId, data = {}) {

        const tasks = loadTasks();

        const task =
            tasks.find(
                t => t.id === taskId
            );

        if (!task) {

            return null;

        }

        task.completed = true;

        task.status = "COMPLETED";

        task.completedAt =
            new Date().toISOString();

        task.evidence =
            data;

        saveTasks(tasks);

        return task;

    }

};
