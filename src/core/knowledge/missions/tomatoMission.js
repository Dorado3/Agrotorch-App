/*
 * AgroTorch Tomato Mission Brain
 */
import { getGrowthStage } from "../../calendar/growthStage.js";

export function getTomatoMission(farm, week) {
  const stage = getGrowthStage("tomato", week).toLowerCase();
  switch (stage) {
    case "establishment":
    case "seedling":
      return {
        title: "Confirm Tomato Establishment",
        reason: "Check stand count, transplant recovery and uniform moisture in the field.",
        impact: "Identify transplant losses early and improve crop establishment."
      };
    case "vegetative":
      return {
        title: "Build a Balanced Tomato Canopy",
        reason: "Inspect plant vigour, canopy density, weeds and visible nutrient-stress symptoms.",
        impact: "Prepare plants for flowering without encouraging unchecked vegetative growth."
      };
    case "flowering":
      return {
        title: "Protect Tomato Flowering",
        reason: "Monitor flower retention, moisture consistency, pollination conditions and pest damage.",
        impact: "Improve the chance of successful fruit set."
      };
    case "fruiting":
      return {
        title: "Monitor Tomato Fruit Development",
        reason: "Inspect fruit load, cracking, blossom-end symptoms and pest or disease damage.",
        impact: "Protect marketable fruit quality and yield."
      };
    case "harvest":
      return {
        title: "Harvest and Grade Tomatoes",
        reason: "Check maturity, harvest interval, handling quality and sales destination for each batch.",
        impact: "Reduce post-harvest losses and improve marketable yield."
      };
    default:
      return {
        title: "Confirm Tomato Crop Stage",
        reason: "The planting timeline or observed crop stage needs confirmation before stage-specific advice is used.",
        impact: "Improve the accuracy of the farm action plan."
      };
  }
}
