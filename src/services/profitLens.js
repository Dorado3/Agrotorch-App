import { getExpenses } from "./expenseStorage.js";
import { getHarvests } from "./harvestStorage.js";
import { getSales } from "./salesStorage.js";

export function getProfitSummary(farmId = null) {
  const belongsToFarm = record => farmId ? record.farmId === farmId : true;
  const expenses = getExpenses().filter(belongsToFarm);
  const harvests = getHarvests().filter(belongsToFarm);
  const sales = getSales().filter(belongsToFarm);

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalRevenue = sales.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const totalHarvest = harvests.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const outstandingPayments = sales
    .filter(item => item.paymentStatus === "Pending")
    .reduce((sum, item) => sum + Number(item.total || 0), 0);
  const netProfit = totalRevenue - totalExpenses;
  const hasFinancialData = expenses.length > 0 || sales.length > 0;

  return {
    totalRevenue,
    totalExpenses,
    totalHarvest,
    outstandingPayments,
    netProfit,
    profitMargin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0,
    hasFinancialData,
    status: !hasFinancialData ? "NO DATA" : netProfit > 0 ? "PROFIT" : netProfit < 0 ? "LOSS" : "BREAK EVEN"
  };
}
