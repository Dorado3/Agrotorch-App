import test from "node:test";
import assert from "node:assert/strict";
import { evaluateFarmRisk } from "../src/core/cdre/ruleEngine.js";
import { evaluateDiseaseRisk } from "../src/core/disease/diseaseRiskEngine.js";
import { evaluatePestRisk } from "../src/core/pest/pestRiskEngine.js";
import { calculateHealth } from "../src/core/health/healthEngine.js";
import { getGrowthStage } from "../src/core/calendar/growthStage.js";
import { getCropMission } from "../src/core/knowledge/missions/missionRegistry.js";
import { evaluateProfit } from "../src/core/profit/profitEngine.js";
import { buildMission } from "../src/core/mission/missionEngine.js";
import { calculatePerformance } from "../src/core/performance/performanceEngine.js";
import { refreshWeatherForFarm } from "../src/core/weather/weatherService.js";
import { getWeatherContext } from "../src/core/weather/weatherEngine.js";

test("CDRE does not invent low risk when evidence is missing", () => {
  assert.equal(evaluateFarmRisk({ crop: "Tomato" }, {}, {}).risk, "UNKNOWN");
});
test("CDRE escalates a verified high disease pressure signal", () => {
  assert.equal(evaluateFarmRisk({ crop: "Tomato" }, {}, { disease: { risk: "HIGH", reason: "Test signal" } }).risk, "HIGH");
});
test("weather risk engines return UNKNOWN without observations", () => {
  const weather = { status: "UNAVAILABLE", humidity: null, temperature: null, rainfallProbability: null };
  assert.equal(evaluateDiseaseRisk({ weather }).risk, "UNKNOWN");
  assert.equal(evaluatePestRisk({ weather }).risk, "UNKNOWN");
});
test("stale weather cannot be used to grade current crop risk", () => {
  const weather = { status: "STALE", humidity: 90, temperature: 36, rainfallProbability: 90 };
  assert.equal(evaluateDiseaseRisk({ weather }).risk, "UNKNOWN");
  assert.equal(evaluatePestRisk({ weather }).risk, "UNKNOWN");
});
test("weather risk engines use recent numeric readings", () => {
  assert.equal(evaluateDiseaseRisk({ weather: { status: "CONNECTED", humidity: 88, rainfallProbability: 75 } }).risk, "HIGH");
  assert.equal(evaluatePestRisk({ weather: { status: "CONNECTED", temperature: 36, humidity: 50 } }).risk, "HIGH");
});
test("health score remains unavailable without enough evidence", () => {
  assert.equal(calculateHealth({ disease: { risk: "UNKNOWN" }, pest: { risk: "UNKNOWN" } }), null);
});
test("crop calendar supports tomato, pepper and cucumber stage estimates", () => {
  assert.equal(getGrowthStage("tomato", 6), "Flowering");
  assert.equal(getGrowthStage("pepper", 8), "Flowering");
  assert.equal(getGrowthStage("cucumber", 6), "Fruiting");
  assert.equal(getGrowthStage("tomato", null), "Unknown");
});
test("tomato and pepper mission lookups resolve the new stage names", () => {
  assert.equal(getCropMission({ crop: "Tomato" }, 1).title, "Confirm Tomato Establishment");
  assert.equal(getCropMission({ crop: "Pepper" }, 8).title, "Protect Pepper Flowering");
});
test("profit engine does not label an empty ledger as break-even", () => {
  assert.equal(evaluateProfit({}, { financialDataAvailable: false }).status, "NO DATA");
});
test("mission engine asks for observations instead of claiming stability", () => {
  const mission = buildMission({
    dashboard: { activities: 0 }, plantingDate: "2026-10-01",
    disease: { risk: "UNKNOWN" }, pest: { risk: "UNKNOWN" },
    profit: { status: "NO DATA" }, farm: { crop: "Tomato" }, week: 2
  }, { risk: "UNKNOWN" });
  assert.equal(mission.title, "Complete a Field Scouting Round");
});
test("performance score remains unavailable without a farm health score", () => {
  assert.equal(calculatePerformance({}, { execution: { score: 90 }, health: null }).score, null);
});
test("weather service uses a location lookup and caches current readings", async () => {
  const oldFetch = globalThis.fetch;
  const oldStorage = globalThis.localStorage;
  const values = new Map();
  globalThis.localStorage = {
    getItem: key => values.get(key) || null,
    setItem: (key, value) => values.set(key, value)
  };
  let call = 0;
  globalThis.fetch = async url => {
    call += 1;
    if (call === 1) return { ok: true, json: async () => ({ results: [{ name: "Abeokuta", admin1: "Ogun", country_code: "NG", latitude: 7.15, longitude: 3.35 }] }) };
    return { ok: true, json: async () => ({
      current: { temperature_2m: 30, relative_humidity_2m: 82, precipitation: 0.2 },
      hourly: { time: [new Date(Date.now() + 3600000).toISOString()], precipitation_probability: [65] }
    }) };
  };
  try {
    const weather = await refreshWeatherForFarm({ id: "test-farm", lga: "Abeokuta", state: "Ogun" });
    assert.equal(weather.status, "CONNECTED");
    assert.equal(weather.temperature, 30);
    assert.equal(weather.humidity, 82);
    assert.equal(weather.rainfallProbability, 65);
    assert.equal(getWeatherContext({ id: "test-farm" }).status, "CONNECTED");
    assert.equal(call, 2);
  } finally {
    globalThis.fetch = oldFetch;
    globalThis.localStorage = oldStorage;
  }
});
