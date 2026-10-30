/*
 * AgroTorch Farm Dashboard Aggregation
 */
import { getWorkspace } from "../workspace/workspace.js";
import { ActivityRepository } from "../../repositories/ActivityRepository.js";
import { ExpenseRepository } from "../../repositories/ExpenseRepository.js";
import { HarvestRepository } from "../../repositories/HarvestRepository.js";
import { SalesRepository } from "../../repositories/SalesRepository.js";

export function buildFarmDashboard(farmOverride = null) {
  const farm = farmOverride || getWorkspace().activeFarm;
  if (!farm) {
    return {
      farmName: "No Active Farm", crop: "-", activities: 0,
      expenses: 0, harvests: 0, sales: 0, revenue: 0, profit: 0,
      financialDataAvailable: false
    };
  }

  const activities = ActivityRepository.farmActivities(farm.id);
  const expenses = ExpenseRepository.farmExpenses(farm.id);
  const harvests = HarvestRepository.farmHarvests(farm.id);
  const sales = SalesRepository.farmSales(farm.id);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalHarvest = harvests.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const totalRevenue = sales.reduce((sum, item) => sum + Number(item.total || 0), 0);

  return {
    farmName: farm.farmName || "Unnamed Farm",
    crop: farm.crop || farm.cropId || "Unknown",
    activities: activities.length,
    expenses: totalExpenses,
    harvests: totalHarvest,
    sales: sales.length,
    revenue: totalRevenue,
    profit: totalRevenue - totalExpenses,
    financialDataAvailable: expenses.length > 0 || sales.length > 0,
    latestActivityAt: activities.reduce((latest, item) => {
      const value = item.date || item.createdAt || item.timestamp;
      if (!value) return latest;
      const time = new Date(value).getTime();
      return Number.isFinite(time) && time > latest ? time : latest;
    }, 0) || null
  };
}
