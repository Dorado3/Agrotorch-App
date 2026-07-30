/*
----------------------------------------------------
AgroTorch Execution Engine
Version 1.0.0
----------------------------------------------------
*/

import { buildDailyChecklist } from "../checklist/dailyChecklist.js";

export function calculateExecution(farm) {

    const checklist =
        buildDailyChecklist(farm);

    const total =
        checklist.length;

    const completed =
        checklist.filter(item =>
            item.completed
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

        checklist

    };

}
