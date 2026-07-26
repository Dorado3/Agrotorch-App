import { getFarms } from "./farmStorage.js";
import { getActivities } from "./activityStorage.js";
import { getProfitSummary } from "./profitLens.js";

export function getDashboardSummary() {

    const farms = getFarms();

    const activities = getActivities();

    const profit = getProfitSummary();

    return {

        totalFarms: farms.length,

        totalActivities: activities.length,

        totalRevenue: profit.totalRevenue,

        totalExpenses: profit.totalExpenses,

        netProfit: profit.netProfit,

        totalHarvest: profit.totalHarvest,

        outstandingPayments: profit.outstandingPayments,

        profitMargin: profit.profitMargin

    };

}
