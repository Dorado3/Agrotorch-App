/*
----------------------------------------------------
AgroTorch Dashboard Intelligence
Version 1.0.0
----------------------------------------------------
*/

import { getDashboardSummary } from "../../services/dashboardSummary.js";
import { getWorkspace } from "../workspace/workspace.js";

export function buildDashboardIntelligence() {

    const summary =
        getDashboardSummary();

    const workspace =
        getWorkspace();

    const farms =
        workspace.farms || [];

    return {

        ...summary,

        activeFarms:
            farms.length,

        healthyFarms:
            0,

        attentionFarms:
            0,

        averageHealth:
            0,

        averageExecution:
            0,

        topRecommendation:
            "Select a farm to receive today's AI recommendation."

    };

}
