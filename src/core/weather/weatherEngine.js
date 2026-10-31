/*
 * Cached weather context for the CDRE.
 * Only recent provider readings are eligible for weather-based risk estimates.
 */
const CACHE_PREFIX = "agrotorch_weather:";
const FRESH_FOR_MS = 3 * 60 * 60 * 1000;
const STALE_FOR_MS = 12 * 60 * 60 * 1000;

function readCache(farmId) {
  if (!farmId || typeof localStorage === "undefined") return null;
  try {
    const value = JSON.parse(localStorage.getItem(CACHE_PREFIX + farmId) || "null");
    return value && typeof value === "object" ? value : null;
  } catch {
    return null;
  }
}

export function getWeatherContext(farm = {}) {
  const cached = readCache(farm.id);
  const age = cached?.observedAt ? Date.now() - new Date(cached.observedAt).getTime() : Infinity;

  if (cached && Number.isFinite(age) && age >= 0 && age <= FRESH_FOR_MS) {
    return {
      ...cached,
      status: "CONNECTED",
      recommendation: "Recent Open-Meteo readings are available. Confirm actual field conditions before acting."
    };
  }

  if (cached && Number.isFinite(age) && age >= 0 && age <= STALE_FOR_MS) {
    return {
      ...cached,
      status: "STALE",
      recommendation: "The last weather reading is stale. Weather-based risk is withheld until a fresh update is available."
    };
  }

  return {
    location: [farm.lga, farm.state].filter(Boolean).join(", ") || farm.location || "Unknown",
    status: "UNAVAILABLE",
    source: null,
    observedAt: null,
    condition: null,
    temperature: null,
    humidity: null,
    rainfallProbability: null,
    recommendation: "No recent weather reading is available. Connect to the internet and confirm the farm's LGA or location."
  };
}
