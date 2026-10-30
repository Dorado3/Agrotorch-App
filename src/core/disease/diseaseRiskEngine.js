/*
 * Weather-informed disease risk.
 * This estimates environmental pressure only; it does not diagnose disease.
 */
export function evaluateDiseaseRisk(context = {}) {
  const weather = context.weather || {};
  const humidity = Number(weather.humidity);
  const rain = Number(weather.rainfallProbability);
  const hasHumidity = Number.isFinite(humidity);
  const hasRain = Number.isFinite(rain);

  if (!hasHumidity && !hasRain) {
    return {
      risk: "UNKNOWN",
      reason: "No verified weather observations are connected. Scout the crop for symptoms; this is not a disease diagnosis.",
      basis: "No weather data"
    };
  }

  if ((hasHumidity && humidity >= 85) || (hasRain && rain >= 70)) {
    return {
      risk: "HIGH",
      reason: "Recorded humidity or rainfall conditions may favour disease development. Inspect leaves, stems and fruit, and confirm symptoms before treatment.",
      basis: "Verified weather inputs"
    };
  }

  if ((hasHumidity && humidity >= 70) || (hasRain && rain >= 40)) {
    return {
      risk: "MEDIUM",
      reason: "Recorded weather conditions may increase disease pressure. Increase scouting frequency and record any symptoms.",
      basis: "Verified weather inputs"
    };
  }

  return {
    risk: "LOW",
    reason: "Available weather readings indicate lower environmental disease pressure; continue routine scouting.",
    basis: "Verified weather inputs"
  };
}
