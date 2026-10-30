/*
 * AgroTorch Weather Context
 * Weather is explicitly unavailable until a verified provider is configured.
 * Never substitute hard-coded conditions for live observations.
 */
export function getWeatherContext(farm = {}) {
  return {
    location: farm.location || [farm.lga, farm.state].filter(Boolean).join(", ") || "Unknown",
    status: "UNAVAILABLE",
    source: null,
    observedAt: null,
    condition: null,
    temperature: null,
    humidity: null,
    rainfallProbability: null,
    recommendation: "Connect a weather provider or enter a verified field observation before using weather-based risk estimates."
  };
}
