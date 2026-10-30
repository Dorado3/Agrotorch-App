/*
 * AgroTorch Performance Engine
 * Returns no score until health and execution signals are both available.
 */
export function calculatePerformance(farm, context = {}) {
  const execution = Number(context.execution?.score);
  const health = Number(context.health);
  if (context.health === null || context.health === undefined ||
      !Number.isFinite(execution) || !Number.isFinite(health)) {
    return { score: null, status: "INSUFFICIENT DATA" };
  }

  const performance = Math.round((execution + health) / 2);
  let status = "EXCELLENT";
  if (performance < 80) status = "GOOD";
  if (performance < 60) status = "FAIR";
  if (performance < 40) status = "POOR";
  return { score: performance, status };
}
