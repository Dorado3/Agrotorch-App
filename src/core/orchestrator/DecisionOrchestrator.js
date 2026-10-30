/*
 * AgroTorch Decision Orchestrator
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
  const context = buildFarmContext(farm);
  const decision = buildDecisionCenter(farm, context);

  context.mission = buildMission(context, decision);
  context.tasks = syncDailyTasks(buildTasks(context), farm?.id);
  context.workPlan = context.tasks;
  context.execution = calculateExecution(context);
  context.priority = buildPriority(context);
  context.impact = calculateImpact(context);
  context.coach = buildAICoach(context);
  context.risk = decision.risk;
  context.alerts = decision.alerts;
  context.evidence = decision.evidence;
  context.health = calculateHealth(context);
  return context;
}
