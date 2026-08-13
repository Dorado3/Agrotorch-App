import { getFarms } from "./farmStorage.js";
import { getActivities } from "./activityStorage.js";
import { getProfitSummary } from "./profitLens.js";

import { getWorkspace } from "../core/workspace/workspace.js";
import { orchestrateFarmDecision } from "../core/orchestrator/DecisionOrchestrator.js";
import { calculatePerformance } from "../core/performance/performanceEngine.js";

export function getDashboardSummary() {

    const farms = getFarms();
    const activities = getActivities();
    const profit = getProfitSummary();

    const workspace = getWorkspace();
    const farm = workspace.activeFarm;

    let decision = null;
    let performance = null;

    if (farm) {

        decision = orchestrateFarmDecision(farm);

        performance =
            calculatePerformance(
                farm,
                decision
            );

    }

    return {

        totalFarms:
            farms.length,

        totalActivities:
            activities.length,

        totalRevenue:
            profit.totalRevenue || 0,

        totalExpenses:
            profit.totalExpenses || 0,

        netProfit:
            profit.netProfit || 0,

        totalHarvest:
            profit.totalHarvest || 0,

        outstandingPayments:
            profit.outstandingPayments || 0,

        profitMargin:
            profit.profitMargin || 0,

        activeFarm:
            farm?.farmName || null,

        crop:
            farm?.crop ||
            farm?.cropType ||
            "Crop not specified",

        stage:
            decision?.stage ||
            farm?.stage ||
            "Unknown",

        farmHealth:
            decision?.health ?? null,

        overallRisk:
            decision?.risk || null,

        execution:
            decision?.execution?.score ?? null,

        performance:
            performance?.score ?? null,

        performanceStatus:
            performance?.status || null,

        priority:
            decision?.priority?.title || null,

        priorityReason:
            decision?.priority?.reason ||
            null,

        mission:
            decision?.mission?.title ||
            null,

        missionReason:
            decision?.mission?.reason ||
            null,

        missionImpact:
            decision?.mission?.impact ||
            null,

        profitProtected:
            decision?.impact?.protectedValue ||
            0,

        impactMessage:
            decision?.impact?.message ||
            null,

        diseaseRisk:
            decision?.disease?.risk ||
            null,

        diseaseReason:
            decision?.disease?.reason ||
            null,

        pestRisk:
            decision?.pest?.risk ||
            null,

        pestReason:
            decision?.pest?.reason ||
            null,

        profitStatus:
            decision?.profit?.status ||
            null,

        profitAdvice:
            decision?.profit?.advice ||
            null,

        coachTitle:
            decision?.coach?.title ||
            null,

        coachMessage:
            decision?.coach?.message ||
            null,

        tasks:
            decision?.tasks ||
            [],

        alerts:
            decision?.alerts ||
            []

    };

}
