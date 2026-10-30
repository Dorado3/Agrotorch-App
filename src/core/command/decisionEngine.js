/*
 * AgroTorch Decision Engine
 */
import { evaluateFarmRisk } from "../cdre/ruleEngine.js";
import { buildFarmDashboard } from "../dashboard/farmDashboard.js";

export function buildDecisionCenter(farm, context = {}) {
  const dashboard = context.dashboard || buildFarmDashboard(farm);
  const cdre = evaluateFarmRisk(farm, dashboard, context);
  const mission = cdre.risk === "HIGH"
    ? "Investigate the highest-risk field condition"
    : cdre.risk === "MEDIUM"
      ? "Complete the priority farm checks"
      : cdre.risk === "LOW"
        ? "Maintain routine monitoring"
        : "Improve farm records before grading risk";

  return {
    health: null,
    mission,
    alerts: cdre.alerts,
    risk: cdre.risk,
    evidence: cdre.evidence,
    dashboard
  };
}
