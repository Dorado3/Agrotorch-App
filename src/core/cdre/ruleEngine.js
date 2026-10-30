/*
 * AgroTorch CDRE rules.
 * UNKNOWN means there is not enough verified evidence to grade risk.
 */
export function evaluateFarmRisk(farm, dashboard = {}, context = {}) {
  if (!farm) {
    return { risk: "UNKNOWN", alerts: [{ level: "INFO", code: "NO_FARM", message: "Register or select a farm to generate decisions." }], evidence: [] };
  }

  const alerts = [];
  const evidence = [];
  const addRiskAlert = (key, label, result) => {
    if (!result || result.risk === "UNKNOWN") return;
    evidence.push({ source: key, risk: result.risk, reason: result.reason });
    if (result.risk === "HIGH" || result.risk === "MEDIUM") {
      alerts.push({ level: result.risk, code: key.toUpperCase() + "_PRESSURE", message: label + ": " + result.reason });
    }
  };

  if (!context.plantingDate) {
    alerts.push({ level: "INFO", code: "MISSING_PLANTING_DATE", message: "Add the planting or transplant date to calculate crop age and stage." });
  } else {
    evidence.push({ source: "crop_calendar", week: context.week, stage: context.stage });
  }

  addRiskAlert("disease", "Disease pressure", context.disease);
  addRiskAlert("pest", "Pest pressure", context.pest);

  if (Number(dashboard.harvests || 0) > 0 && Number(dashboard.sales || 0) === 0) {
    alerts.push({ level: "MEDIUM", code: "UNSOLD_HARVEST", message: "Harvest has been recorded but no sale is recorded. Confirm stock, storage condition and sales status." });
    evidence.push({ source: "harvest_sales_records" });
  }

  if (Number(dashboard.revenue || 0) > 0 && Number(dashboard.expenses || 0) > Number(dashboard.revenue || 0)) {
    alerts.push({ level: "MEDIUM", code: "CASHFLOW_PRESSURE", message: "Recorded expenses exceed recorded sales revenue. Review the period and confirm that all sales and costs are entered." });
    evidence.push({ source: "financial_records" });
  }

  const knownRisks = evidence.filter(item => item.risk);
  let risk = "UNKNOWN";
  if (knownRisks.some(item => item.risk === "HIGH")) risk = "HIGH";
  else if (knownRisks.some(item => item.risk === "MEDIUM") || alerts.some(item => item.level === "MEDIUM")) risk = "MEDIUM";
  else if (knownRisks.length > 0 && knownRisks.every(item => item.risk === "LOW") && !alerts.some(item => item.level === "MEDIUM")) risk = "LOW";

  return { risk, alerts, evidence };
}
