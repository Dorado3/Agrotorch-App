/*
 * Weather-informed disease environmental pressure.
 * This is not a crop disease diagnosis.
 */
export function evaluateDiseaseRisk(context = {}) {
  const weather = context.weather || {};
  if (weather.status === "UNAVAILABLE" || weather.status === "STALE") {
    return {
      risk: "UNKNOWN",
      reason: "No recent verified weather readings are available. Scout the crop for symptoms; this is not a disease diagnosis.",
      basis: weather.status === "STALE" ? "Stale weather data" : "No weather data"
    };
  }

  const hasValue = value => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
  const hasHumidity = hasValue(weather.humidity);
  const hasRain = hasValue(weather.rainfallProbability);
  const humidity = hasHumidity ? Number(weather.humidity) : null;
  const rain = hasRain ? Number(weather.rainfallProbability) : null;

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
      reason: "Recent humidity or forecast rainfall may favour disease development. Inspect leaves, stems and fruit, and confirm symptoms before treatment.",
      basis: "Recent Open-Meteo readings"
    };
  }
  if ((hasHumidity && humidity >= 70) || (hasRain && rain >= 40)) {
    return {
      risk: "MEDIUM",
      reason: "Recent weather conditions may increase disease pressure. Increase scouting frequency and record any symptoms.",
      basis: "Recent Open-Meteo readings"
    };
  }
  return {
    risk: "LOW",
    reason: "Available recent weather readings indicate lower environmental disease pressure; continue routine scouting.",
    basis: "Recent Open-Meteo readings"
  };
}
