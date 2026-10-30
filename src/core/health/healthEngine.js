/*
 * Farm health is a composite indicator, not a measured biological fact.
 * Return null until there are enough recorded signals to support a score.
 */
export function calculateHealth(context = {}) {
  const signals = [];
  let deductions = 0;

  const executionScore = Number(context.execution?.score);
  if ((context.tasks || []).length > 0 && Number.isFinite(executionScore)) {
    signals.push("task_execution");
    deductions += (100 - Math.max(0, Math.min(100, executionScore))) * 0.3;
  }

  const diseaseRisk = context.disease?.risk;
  if (["LOW", "MEDIUM", "HIGH"].includes(diseaseRisk)) {
    signals.push("disease_weather");
    if (diseaseRisk === "HIGH") deductions += 20;
    else if (diseaseRisk === "MEDIUM") deductions += 10;
  }

  const pestRisk = context.pest?.risk;
  if (["LOW", "MEDIUM", "HIGH"].includes(pestRisk)) {
    signals.push("pest_weather");
    if (pestRisk === "HIGH") deductions += 15;
    else if (pestRisk === "MEDIUM") deductions += 8;
  }

  if (context.dashboard?.financialDataAvailable && context.profit?.status) {
    signals.push("financial_records");
    if (context.profit.status === "LOSS") deductions += 15;
    else if (context.profit.status === "LOW PROFIT") deductions += 8;
  }

  if (signals.length < 2) return null;
  return Math.max(0, Math.min(100, Math.round(100 - deductions)));
}
