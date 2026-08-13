/*
----------------------------------------------------
AgroTorch Decision Orchestrator
Version 11.0.0
----------------------------------------------------
*/

import { buildDecisionCenter } from "../command/decisionEngine.js";
import { buildMission } from "../mission/missionEngine.js";
import { buildFarmContext } from "../context/farmContext.js";

import { calculateExecution } from "../execution/executionEngine.js";
import { calculateHealth } from "../health/healthEngine.js";
import { buildPriority } from "../priority/priorityEngine.js";
import { calculateImpact } from "../impact/impactEngine.js";

import { buildAICoach } from "../coach/aiCoach.js";
import { buildTasks } from "../tasks/taskEngine.js";
import { syncDailyTasks } from "../tasks/taskSync.js";

export function orchestrateFarmDecision(farm) {

    const decision =
        buildDecisionCenter(farm);

    const context =
        buildFarmContext(farm);

    context.mission =
        buildMission(context, decision);

    /*
    ----------------------------------------
    Build Today's Tasks
    ----------------------------------------
    */

    context.tasks =
        syncDailyTasks(
            buildTasks(context),
            farm.id
        );

    /*
    Single source of truth:
    Today's synchronized tasks
    */

    context.workPlan =
        context.tasks;

    /*
    ----------------------------------------
    Execution
    ----------------------------------------
    */

    context.execution =
        calculateExecution(context);

    context.priority =
        buildPriority(context);

    context.impact =
        calculateImpact(context);

    context.coach =
        buildAICoach(context);

    context.risk =
        decision.risk;

    context.alerts =
        decision.alerts;

    context.health =
        calculateHealth(context);

    return context;

}
