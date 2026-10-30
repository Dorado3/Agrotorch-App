import { pepperKnowledge } from "../vault/pepper.js";
import { getGrowthStage } from "../../calendar/growthStage.js";

export function getPepperMission(farm, week) {
  const stage = getGrowthStage("pepper", week).toLowerCase();
  return pepperKnowledge.stages[stage] || null;
}
