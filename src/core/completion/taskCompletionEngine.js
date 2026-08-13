/*
----------------------------------------------------
AgroTorch Task Completion Engine
Version 1.0.0
----------------------------------------------------
*/

export function completeTask(task, data = {}) {

    return {

        ...task,

        completed: true,

        status: "COMPLETED",

        completedAt:
            new Date().toISOString(),

        evidence: {

            expense:
                data.expense || null,

            harvest:
                data.harvest || null,

            sale:
                data.sale || null,

            note:
                data.note || ""

        }

    };

}
