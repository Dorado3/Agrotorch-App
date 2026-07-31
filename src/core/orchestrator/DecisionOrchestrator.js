/*
----------------------------------------------------
AgroTorch Decision Orchestrator
Version 5.0.0
----------------------------------------------------
*/

import { buildDecisionCenter } from "../command/decisionEngine.js";
import { buildMission } from "../mission/missionEngine.js";
import { buildFarmContext } from "../context/farmContext.js";
import { calculateExecution } from "../execution/executionEngine.js";
import { buildAICoach } from "../coach/aiCoach.js";

export function orchestrateFarmDecision(farm) {

    const decision =
        buildDecisionCenter(farm);

    const context =
        buildFarmContext(farm);

    context.mission =
        buildMission(
            context,
            decision
        );

    context.health =
        decision.health;

    context.risk =
        decision.risk;

    context.alerts =
        decision.alerts;

    context.execution =
        calculateExecution(farm);

    context.coach =
        buildAICoach(context);

    return context;

}
