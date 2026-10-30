/*
 * AgroTorch Crop Mission Registry
 */
import { getTomatoMission } from "./tomatoMission.js";
import { getPepperMission } from "./pepperMission.js";

const missionRegistry = {
  tomato: getTomatoMission,
  pepper: getPepperMission
};

export function getCropMission(farm, week) {
  const crop = String(farm?.cropId || farm?.crop || "").trim().toLowerCase();
  const resolver = missionRegistry[crop];
  return resolver ? resolver(farm, week) : null;
}
