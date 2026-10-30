import { getFarms } from "./farmStorage.js";
import { getActivities } from "./activityStorage.js";
import { getProfitSummary } from "./profitLens.js";
import { getWorkspace } from "../core/workspace/workspace.js";
import { orchestrateFarmDecision } from "../core/orchestrator/DecisionOrchestrator.js";
import { calculatePerformance } from "../core/performance/performanceEngine.js";

export function getDashboardSummary() {
  const farms = getFarms();
  const workspace = getWorkspace();
  const farm = workspace.activeFarm;
  const activities = getActivities().filter(item => farm && item.farmId === farm.id);
  const profit = getProfitSummary(farm?.id || "__no_active_farm__");

  let decision = null;
  let performance = null;
  if (farm) {
    decision = orchestrateFarmDecision(farm);
    performance = calculatePerformance(farm, decision);
  }

  return {
    totalFarms: farms.length,
    totalActivities: activities.length,
    totalRevenue: profit.totalRevenue,
    totalExpenses: profit.totalExpenses,
    netProfit: profit.netProfit,
    totalHarvest: profit.totalHarvest,
    outstandingPayments: profit.outstandingPayments,
    profitMargin: profit.profitMargin,
    hasFinancialData: profit.hasFinancialData,
    activeFarm: farm?.farmName || null,
    crop: farm?.crop || farm?.cropType || "Crop not specified",
    stage: decision?.stage || "Unknown",
    farmHealth: decision?.health ?? null,
    overallRisk: decision?.risk || "UNKNOWN",
    execution: decision?.execution?.score ?? null,
    performance: performance?.score ?? null,
    performanceStatus: performance?.status || null,
    priority: decision?.priority?.title || null,
    priorityReason: decision?.priority?.reason || null,
    mission: decision?.mission?.title || null,
    missionReason: decision?.mission?.reason || null,
    missionImpact: decision?.mission?.impact || null,
    profitProtected: decision?.impact?.protectedValue ?? 0,
    impactMessage: decision?.impact?.message || null,
    diseaseRisk: decision?.disease?.risk || "UNKNOWN",
    diseaseReason: decision?.disease?.reason || null,
    pestRisk: decision?.pest?.risk || "UNKNOWN",
    pestReason: decision?.pest?.reason || null,
    profitStatus: decision?.profit?.status || (profit.hasFinancialData ? profit.status : "NO DATA"),
    profitAdvice: decision?.profit?.advice || null,
    coachTitle: decision?.coach?.title || null,
    coachMessage: decision?.coach?.message || null,
    tasks: decision?.tasks || [],
    alerts: decision?.alerts || []
  };
}
