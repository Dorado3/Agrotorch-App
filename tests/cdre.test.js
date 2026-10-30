import test from "node:test";
import assert from "node:assert/strict";
import { evaluateFarmRisk } from "../src/core/cdre/ruleEngine.js";
import { evaluateDiseaseRisk } from "../src/core/disease/diseaseRiskEngine.js";
import { evaluatePestRisk } from "../src/core/pest/pestRiskEngine.js";
import { getGrowthStage } from "../src/core/calendar/growthStage.js";

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
  assert.equal(evaluateDiseaseRisk({ weather: { status: "UNAVAILABLE" } }).risk, "UNKNOWN");
  assert.equal(evaluatePestRisk({ weather: { status: "UNAVAILABLE" } }).risk, "UNKNOWN");
});

test("crop calendar supports tomato, pepper and cucumber stage estimates", () => {
  assert.equal(getGrowthStage("tomato", 6), "Flowering");
  assert.equal(getGrowthStage("pepper", 8), "Flowering");
  assert.equal(getGrowthStage("cucumber", 6), "Fruiting");
  assert.equal(getGrowthStage("tomato", null), "Unknown");
});
