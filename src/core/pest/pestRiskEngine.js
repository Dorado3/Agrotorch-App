/*
 * Weather-informed general pest pressure.
 * Weather is a proxy only and cannot confirm an infestation.
 */
export function evaluatePestRisk(context = {}) {
  const weather = context.weather || {};
  if (weather.status === "UNAVAILABLE" || weather.status === "STALE") {
    return {
      risk: "UNKNOWN",
      reason: "No recent verified weather readings are available. Conduct routine field scouting; weather alone cannot confirm pest presence.",
      basis: weather.status === "STALE" ? "Stale weather data" : "No weather data"
    };
  }

  const hasValue = value => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
  const hasTemperature = hasValue(weather.temperature);
  const hasHumidity = hasValue(weather.humidity);
  const temperature = hasTemperature ? Number(weather.temperature) : null;
  const humidity = hasHumidity ? Number(weather.humidity) : null;

  if (!hasTemperature && !hasHumidity) {
    return {
      risk: "UNKNOWN",
      reason: "No verified weather readings are available. Conduct routine field scouting; weather alone cannot confirm pest presence.",
      basis: "No weather data"
    };
  }
  if ((hasTemperature && temperature >= 32 && hasHumidity && humidity >= 70) ||
      (hasTemperature && temperature >= 35)) {
    return {
      risk: "HIGH",
      reason: "Recent conditions may favour some pest activity. Inspect growing points, leaf undersides, flowers and fruit before deciding on control.",
      basis: "Recent Open-Meteo readings"
    };
  }
  if ((hasTemperature && temperature >= 29) || (hasHumidity && humidity >= 65)) {
    return {
      risk: "MEDIUM",
      reason: "Conditions may support pest activity. Check representative plants and record pest counts or damage.",
      basis: "Recent Open-Meteo readings"
    };
  }
  return {
    risk: "LOW",
    reason: "Available recent weather readings indicate lower general pest pressure; continue routine scouting.",
    basis: "Recent Open-Meteo readings"
  };
}
