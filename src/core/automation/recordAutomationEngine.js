/*
----------------------------------------------------
AgroTorch Record Automation Engine
Version 1.0.0
----------------------------------------------------
*/

export function automateRecords(completedTask) {

    const updates = {

        expense: null,

        harvest: null,

        sale: null,

        journal: null

    };

    if (completedTask.evidence?.expense) {

        updates.expense = {

            ...completedTask.evidence.expense,

            createdAt: new Date().toISOString()

        };

    }

    if (completedTask.evidence?.harvest) {

        updates.harvest = {

            ...completedTask.evidence.harvest,

            createdAt: new Date().toISOString()

        };

    }

    if (completedTask.evidence?.sale) {

        updates.sale = {

            ...completedTask.evidence.sale,

            createdAt: new Date().toISOString()

        };

    }

    updates.journal = {

        title: completedTask.title,

        completedAt: completedTask.completedAt,

        note:
            completedTask.evidence?.note || ""

    };

    return updates;

}
