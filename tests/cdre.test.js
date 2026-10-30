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

test("CDRE does not invent low risk when evidence is missing", () => {
  const result = evaluateFarmRisk({ crop: "Tomato" }, {}, {});
  assert.equal(result.risk, "UNKNOWN");
});

test("CDRE escalates a verified high disease pressure signal", () => {
  const result = evaluateFarmRisk({ crop: "Tomato" }, {}, {
    disease: { risk: "HIGH", reason: "Test signal" }
  });
  assert.equal(result.risk, "HIGH");
});

test("weather risk engines return UNKNOWN without observations", () => {
  const weather = { status: "UNAVAILABLE", humidity: null, temperature: null, rainfallProbability: null };
  assert.equal(evaluateDiseaseRisk({ weather }).risk, "UNKNOWN");
  assert.equal(evaluatePestRisk({ weather }).risk, "UNKNOWN");
});

test("weather risk engines use real numeric readings", () => {
  assert.equal(evaluateDiseaseRisk({ weather: { humidity: 88, rainfallProbability: 75 } }).risk, "HIGH");
  assert.equal(evaluatePestRisk({ weather: { temperature: 36, humidity: 50 } }).risk, "HIGH");
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
    dashboard: { activities: 0 },
    plantingDate: "2026-10-01",
    disease: { risk: "UNKNOWN" },
    pest: { risk: "UNKNOWN" },
    profit: { status: "NO DATA" },
    farm: { crop: "Tomato" },
    week: 2
  }, { risk: "UNKNOWN" });
  assert.equal(mission.title, "Complete a Field Scouting Round");
});
