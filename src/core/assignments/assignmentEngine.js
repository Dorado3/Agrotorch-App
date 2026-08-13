/*
----------------------------------------------------
AgroTorch Assignment Engine
Version 1.0.0
----------------------------------------------------
*/

export function buildAssignments(tasks = []) {

    return tasks.map(task => ({

        id: task.id,

        title: task.title,

        reason: task.reason,

        status: "PENDING",

        completed: false,

        completedAt: null,

        completedBy: null

    }));

}
