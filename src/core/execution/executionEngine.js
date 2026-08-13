/*
----------------------------------------------------
AgroTorch Execution Engine
Version 3.0.0
Decision → Task → Completion
----------------------------------------------------
*/

export function calculateExecution(context = {}) {

    const tasks =
        context.tasks || [];

    const total =
        tasks.length;

    const completed =
        tasks.filter(task =>
            task.completed === true ||
            task.status === "COMPLETED"
        ).length;

    const score =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );

    return {

        score,

        completed,

        total,

        checklist: tasks

    };

}
