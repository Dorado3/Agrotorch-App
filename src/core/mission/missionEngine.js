/*
 * AgroTorch Mission Engine
 */
import { getCropMission } from "../knowledge/missions/missionRegistry.js";

export function buildMission(context = {}, decision = {}) {
  const activities = Number(context.dashboard?.activities || 0);
  const disease = context.disease?.risk || "UNKNOWN";
  const pest = context.pest?.risk || "UNKNOWN";

  if (disease === "HIGH") {
    return {
      title: "Verify Possible Disease Pressure",
      reason: context.disease.reason,
      impact: "Confirm symptoms early and protect unaffected crop sections."
    };
  }

  if (pest === "HIGH") {
    return {
      title: "Verify Pest Activity in the Field",
      reason: context.pest.reason,
      impact: "Confirm pest presence and damage before selecting a control measure."
    };
  }

  if (!context.plantingDate) {
    return {
      title: "Complete the Crop Timeline",
      reason: "The planting or transplant date is missing, so crop age and stage cannot be estimated reliably.",
      impact: "Improve the accuracy of crop-stage tasks and decisions."
    };
  }

  if (activities === 0) {
    return {
      title: "Complete a Field Scouting Round",
      reason: "No field observations are recorded for this farm yet. Inspect representative plants and record what you find.",
      impact: "Give the CDRE real observations to work with."
    };
  }

  if (context.profit?.status === "LOSS" || context.profit?.status === "LOW PROFIT") {
    return {
      title: "Review Farm Profitability",
      reason: context.profit.advice,
      impact: "Improve cost visibility and support better production decisions."
    };
  }

  const mission = getCropMission(context.farm, context.week);
  if (mission) return mission;

  return {
    title: "Collect Field Observations",
    reason: "There is not yet enough crop-specific knowledge for a tailored mission. Confirm the crop and record field conditions.",
    impact: "Improve future recommendations and farm records."
  };
}
