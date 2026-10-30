/*
 * AgroTorch daily task recommendations.
 * Advice is operational and observational; no chemical rates are invented.
 */
export function buildTasks(context = {}) {
  const tasks = [];
  const add = (task) => tasks.push({ priority: "NORMAL", ...task });

  if (!context.plantingDate) {
    add({
      id: "confirm-planting-date",
      title: "Complete the crop timeline",
      reason: "The planting or transplant date is missing, so crop age and stage cannot be estimated.",
      objective: "Improve the accuracy of stage-based recommendations.",
      instructions: "Enter the actual planting date. For nursery-raised crops, enter the transplant date as the field start date and retain the nursery date separately.",
      materials: "Farm planting records.",
      safety: "Do not estimate a date if the actual date can be confirmed from farm records."
    });
  }

  const stage = String(context.stage || "Unknown").toLowerCase();
  const crop = String(context.crop || "crop");
  const stageTask = {
    establishment: ["Check plant establishment", "Inspect missing stands, transplant shock, wilting and early weed pressure across representative sections."],
    seedling: ["Inspect seedling establishment", "Check stand count, seedling vigour, moisture and early pest or disease symptoms."],
    vegetative: ["Review vegetative growth", "Inspect plant vigour, canopy density, weeds and visible nutrient-stress symptoms. Record affected sections before changing inputs."],
    flowering: ["Inspect flowering and fruit set", "Check flower retention, pollination conditions, moisture consistency and any flower or young-fruit damage."],
    fruiting: ["Monitor fruit development", "Inspect fruit load, fruit damage, moisture consistency and plant health. Review the existing nutrient programme before making adjustments."],
    harvest: ["Plan and record harvest", "Check maturity, harvest interval, handling quality, harvested quantity and destination for each batch."],
    "tasseling/silking": ["Inspect tasseling and silking", "Check synchrony, moisture stress, lodging and pest damage during reproductive development."],
    "grain filling": ["Monitor grain filling", "Check crop stand, lodging, moisture stress and signs of ear or grain damage."],
    "root development": ["Inspect root-crop development", "Check plant stand, weed pressure, waterlogging and visible pest or disease symptoms."]
  };
  const selected = stageTask[stage];
  if (selected) {
    add({
      id: "stage-" + stage.replace(/[^a-z0-9]+/g, "-"),
      title: selected[0],
      reason: "The recorded crop calendar estimates " + crop + " is at the " + context.stage + " stage.",
      objective: "Verify crop condition and catch operational problems early.",
      instructions: selected[1],
      materials: "Scouting sheet, phone/camera and farm records.",
      safety: "Confirm actual crop stage in the field; calendar estimates can differ from crop development."
    });
  } else {
    add({
      id: "confirm-crop-stage",
      title: "Confirm crop and growth stage",
      reason: "The system does not yet have enough crop-calendar information for a stage-specific plan.",
      objective: "Capture reliable crop-stage information.",
      instructions: "Confirm the crop, variety, planting method, field date and visible growth stage. Record the observation in the farm log.",
      materials: "Farm records and phone/camera.",
      safety: "Use observed crop development rather than relying on a calendar estimate alone."
    });
  }

  add({
    id: "daily-field-scout",
    title: "Complete a field scouting round",
    reason: "Routine scouting provides the observations needed for reliable crop-risk decisions.",
    objective: "Record crop condition and any emerging problems.",
    instructions: "Inspect representative plants from field edges and interior rows. Check leaf undersides, growing points, stems, flowers and fruits as applicable. Photograph and record the location of any symptoms or pest activity.",
    materials: "Scouting sheet, phone/camera and appropriate PPE.",
    safety: "Do not apply a pesticide based only on a weather-risk estimate or an unconfirmed diagnosis."
  });

  if (context.disease?.risk === "MEDIUM" || context.disease?.risk === "HIGH") {
    add({
      id: "verify-disease-symptoms",
      priority: context.disease.risk,
      title: "Verify possible disease pressure",
      reason: context.disease.reason,
      objective: "Distinguish environmental risk from actual disease symptoms.",
      instructions: "Photograph affected plants, note the percentage and distribution of affected plants, and record recent rainfall or irrigation. Seek agronomist confirmation before treatment.",
      materials: "Phone/camera, field map and scouting record.",
      safety: "Do not diagnose or select a chemical from weather conditions alone."
    });
  }

  if (context.pest?.risk === "MEDIUM" || context.pest?.risk === "HIGH") {
    add({
      id: "verify-pest-activity",
      priority: context.pest.risk,
      title: "Check for pest activity",
      reason: context.pest.reason,
      objective: "Confirm pest presence and estimate the level of damage.",
      instructions: "Inspect growing points, leaf undersides, flowers and fruits. Record pest counts or visible damage on a consistent sample of plants.",
      materials: "Scouting sheet, phone/camera and appropriate PPE.",
      safety: "Do not spray without identifying the pest and checking the approved product label and farm SOP."
    });
  }

  if (context.profit?.status === "LOSS") {
    add({
      id: "review-expenses",
      priority: "MEDIUM",
      title: "Review recorded farm expenses",
      reason: context.profit.advice,
      objective: "Identify cost drivers and confirm record completeness.",
      instructions: "Review input, labour, irrigation, transport and other recorded costs. Confirm the accounting period and enter any missing sales before drawing conclusions.",
      materials: "Expense and sales records.",
      safety: "Do not delete or alter financial records without verification."
    });
  }

  return tasks;
}
