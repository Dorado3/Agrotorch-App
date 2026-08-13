/*
----------------------------------------------------
AgroTorch Executive Summary
Version 1.0.0
----------------------------------------------------
*/

import { getWorkspace } from "../workspace/workspace.js";

export function buildExecutiveSummary() {

    const workspace =
        getWorkspace();

    const farms =
        workspace.farms || [];

    return {

        activeFarms:
            farms.length,

        healthyFarms:
            farms.filter(f => !f.archived).length,

        attentionFarms:
            0,

        averageHealth:
            0,

        averageExecution:
            0

    };

}
