/*
 * AgroTorch Farm Context Engine
 */
import { getFarmWeek } from "../calendar/farmCalendar.js";
import { getGrowthStage } from "../calendar/growthStage.js";
import { getEffectivePlantingDate } from "../calendar/effectivePlantingDate.js";
import { getWeatherContext } from "../weather/weatherEngine.js";
import { evaluateDiseaseRisk } from "../disease/diseaseRiskEngine.js";
import { evaluatePestRisk } from "../pest/pestRiskEngine.js";
import { evaluateProfit } from "../profit/profitEngine.js";
import { buildFarmDashboard } from "../dashboard/farmDashboard.js";

export function buildFarmContext(farm) {
  const effectivePlantingDate = getEffectivePlantingDate(farm);
  const week = effectivePlantingDate ? getFarmWeek(effectivePlantingDate) : null;
  const stage = effectivePlantingDate ? getGrowthStage(farm?.cropId || farm?.crop, week) : "Unknown";
  const weather = getWeatherContext(farm || {});
  const dashboard = buildFarmDashboard(farm);
  const context = {
    farm,
    crop: farm?.crop || farm?.cropId || "Unknown",
    variety: farm?.variety || "",
    plantingDate: effectivePlantingDate,
    week,
    stage,
    weather,
    dashboard,
    timestamp: new Date().toISOString()
  };
  context.disease = evaluateDiseaseRisk(context);
  context.pest = evaluatePestRisk(context);
  context.profit = evaluateProfit(context, dashboard);
  return context;
}
