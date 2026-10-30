/*
 * Approximate crop-stage windows, measured from the effective field date.
 * These are planning estimates; the farmer must confirm actual crop stage.
 */
const STAGES = {
  tomato: [[2, "Establishment"], [4, "Vegetative"], [7, "Flowering"], [12, "Fruiting"], [Infinity, "Harvest"]],
  pepper: [[2, "Establishment"], [6, "Vegetative"], [10, "Flowering"], [16, "Fruiting"], [Infinity, "Harvest"]],
  cucumber: [[2, "Establishment"], [4, "Vegetative"], [5, "Flowering"], [8, "Fruiting"], [Infinity, "Harvest"]],
  maize: [[2, "Establishment"], [6, "Vegetative"], [9, "Tasseling/Silking"], [14, "Grain Filling"], [Infinity, "Harvest"]],
  cassava: [[8, "Establishment"], [20, "Vegetative"], [36, "Root Development"], [Infinity, "Harvest"]],
  watermelon: [[2, "Establishment"], [5, "Vegetative"], [7, "Flowering"], [12, "Fruiting"], [Infinity, "Harvest"]]
};

export function getGrowthStage(crop, week) {
  const key = String(crop || "").trim().toLowerCase();
  const normalizedWeek = Number(week);
  if (!key || !Number.isFinite(normalizedWeek) || normalizedWeek < 1) return "Unknown";
  const schedule = STAGES[key];
  if (!schedule) return "Unknown";
  return schedule.find(([lastWeek]) => normalizedWeek <= lastWeek)?.[1] || "Unknown";
}
