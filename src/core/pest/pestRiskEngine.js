/*
 * AgroTorch pest pressure context.
 * Weather is a proxy only and must never be presented as proof of infestation.
 */
export function evaluatePestRisk(context = {}) {
  const weather = context.weather || {};
  const temperature = Number(weather.temperature);
  const humidity = Number(weather.humidity);
  const hasTemperature = Number.isFinite(temperature);
  const hasHumidity = Number.isFinite(humidity);

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
      reason: "Recorded conditions may favour some pest activity. Inspect growing points, leaf undersides, flowers and fruit before deciding on control.",
      basis: "Verified weather inputs"
    };
  }

  if ((hasTemperature && temperature >= 29) || (hasHumidity && humidity >= 65)) {
    return {
      risk: "MEDIUM",
      reason: "Conditions may support pest activity. Check representative plants and record pest counts or damage.",
      basis: "Verified weather inputs"
    };
  }

  return {
    risk: "LOW",
    reason: "Available weather readings indicate lower general pest pressure; continue routine scouting.",
    basis: "Verified weather inputs"
  };
}
