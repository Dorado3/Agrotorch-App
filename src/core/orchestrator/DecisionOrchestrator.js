/*
----------------------------------------------------
AgroTorch Decision Orchestrator
Version 4.0.0
----------------------------------------------------
*/

import { buildDecisionCenter } from "../command/decisionEngine.js";

import { buildMission } from "../mission/missionEngine.js";

import { buildFarmContext } from "../context/farmContext.js";

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

    return context;

}
