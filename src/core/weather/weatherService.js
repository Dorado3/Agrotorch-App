import { getWeatherContext } from "./weatherEngine.js";

const CACHE_PREFIX = "agrotorch_weather:";

function finiteOrNull(value) {
  const number = Number(value);
  return value !== null && value !== undefined && value !== "" && Number.isFinite(number) ? number : null;
}

export async function refreshWeatherForFarm(farm) {
  if (!farm?.id) return getWeatherContext(farm || {});
  const cached = getWeatherContext(farm);
  if (cached.status === "CONNECTED") return cached;

  const place = String(farm.lga || farm.location || farm.state || "").trim();
  if (!place) return cached;

  try {
    const geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(place) + "&count=8&language=en&format=json&countryCode=NG";
    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) throw new Error("Weather location lookup failed.");
    const geoData = await geoResponse.json();
    const candidates = Array.isArray(geoData.results) ? geoData.results : [];
    const state = String(farm.state || "").toLowerCase();
    const location = candidates.find(item =>
      item.country_code === "NG" && (!state || String(item.admin1 || "").toLowerCase().includes(state))
    ) || candidates.find(item => item.country_code === "NG") || candidates[0];

    if (!location || !Number.isFinite(Number(location.latitude)) || !Number.isFinite(Number(location.longitude))) {
      throw new Error("The farm location could not be matched. Check the LGA and state in the farm profile.");
    }

    const forecastUrl = "https://api.open-meteo.com/v1/forecast?latitude=" +
      encodeURIComponent(location.latitude) + "&longitude=" +
      encodeURIComponent(location.longitude) +
      "&current=temperature_2m,relative_humidity_2m,precipitation" +
      "&hourly=precipitation_probability&forecast_days=1&timezone=auto";
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) throw new Error("Weather provider request failed.");
    const forecast = await forecastResponse.json();
    const current = forecast.current || {};
    const times = forecast.hourly?.time || [];
    const probabilities = forecast.hourly?.precipitation_probability || [];
    const now = Date.now();
    const nextSixHours = probabilities.filter((value, index) => {
      const time = new Date(times[index]).getTime();
      return Number.isFinite(time) && time >= now && time <= now + 6 * 60 * 60 * 1000 && finiteOrNull(value) !== null;
    }).map(Number);
    const rainfallProbability = nextSixHours.length ? Math.max(...nextSixHours) : null;

    const weather = {
      location: [location.name, location.admin1].filter(Boolean).join(", "),
      status: "CONNECTED",
      source: "Open-Meteo",
      observedAt: new Date().toISOString(),
      condition: null,
      temperature: finiteOrNull(current.temperature_2m),
      humidity: finiteOrNull(current.relative_humidity_2m),
      rainfall: finiteOrNull(current.precipitation),
      rainfallProbability,
      recommendation: "Recent weather readings are available. Confirm actual field conditions before acting."
    };

    if (weather.temperature === null && weather.humidity === null && weather.rainfallProbability === null) {
      throw new Error("The weather provider returned incomplete readings.");
    }

    localStorage.setItem(CACHE_PREFIX + farm.id, JSON.stringify(weather));
    return weather;
  } catch (error) {
    const fallback = getWeatherContext(farm);
    if (fallback.status === "STALE") return fallback;
    return {
      ...fallback,
      status: "UNAVAILABLE",
      recommendation: error?.message || "Weather could not be refreshed. Routine field scouting is still required."
    };
  }
}
