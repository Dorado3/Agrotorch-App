import test from "node:test";
import assert from "node:assert/strict";
import {
  createOrganisation, createMembership, normaliseFarm,
  createFarmBlock, createCropCycle, canViewFarm, canManageFarm
} from "./platformModel.js";

test("organisation creation requires a name, supported type and creator", () => {
  assert.throws(() => createOrganisation({}, "u1"), /name/);
  assert.throws(() => createOrganisation({ name: "AgroTorch", type: "unknown" }, "u1"), /type/);
  const org = createOrganisation({ name: "AgroTorch", type: "agribusiness" }, "u1");
  assert.equal(org.createdBy, "u1");
  assert.equal(org.schemaVersion, 1);
});

test("membership defaults to invited and deduplicates farm scope", () => {
  const member = createMembership({
    organisationId: "o1", userId: "u2", role: "supervisor",
    farmIds: ["f1", "f1", "", "f2"]
  });
  assert.equal(member.status, "invited");
  assert.deepEqual(member.farmIds, ["f1", "f2"]);
  assert.throws(() => createMembership({ organisationId: "o1", userId: "u2", role: "root" }), /role/);
});

test("legacy farms normalize without losing their existing fields", () => {
  const farm = normaliseFarm({ id: "f1", userId: "u1", farmName: "Tomato farm", size: 1 });
  assert.equal(farm.ownerId, "u1");
  assert.equal(farm.farmName, "Tomato farm");
  assert.equal(farm.status, "active");
  assert.deepEqual(farm.blocks, []);
  assert.deepEqual(farm.cropCycles, []);
});

test("blocks require a farm, creator, name and positive area when supplied", () => {
  assert.throws(() => createFarmBlock({ name: "A" }, "", "u1"), /Farm/);
  assert.throws(() => createFarmBlock({ name: "A", areaHectares: 0 }, "f1", "u1"), /greater than zero/);
  assert.equal(createFarmBlock({ name: "Block A", areaHectares: 0.4 }, "f1", "u1").areaHectares, 0.4);
});

test("crop cycles require a crop and valid date", () => {
  assert.throws(() => createCropCycle({ plantingDate: "2026-01-01" }, "f1", "", "u1"), /Crop/);
  assert.throws(() => createCropCycle({ crop: "Tomato", plantingDate: "not-a-date" }, "f1", "", "u1"), /date/);
  assert.equal(createCropCycle({ crop: "Tomato", plantingDate: "2026-01-01" }, "f1", "b1", "u1").blockId, "b1");
});

test("organisation members must be active and scoped to the farm organisation", () => {
  const farm = { id: "f1", ownerId: "u1", organisationId: "o1" };
  const member = { organisationId: "o1", userId: "u2", role: "supervisor", status: "active" };
  assert.equal(canViewFarm({ userId: "u2", farm, membership: member }), true);
  assert.equal(canManageFarm({ userId: "u2", farm, membership: member }), false);
  assert.equal(canManageFarm({ userId: "u1", farm }), true);
  assert.equal(canViewFarm({ userId: "u3", farm, membership: member }), false);
  assert.equal(canViewFarm({ userId: "u2", farm, membership: { ...member, status: "suspended" } }), false);
});

test("farm managers can manage their assigned organisation farm", () => {
  const farm = { id: "f1", ownerId: "u1", organisationId: "o1" };
  const membership = { organisationId: "o1", userId: "u2", role: "farm_manager", status: "active" };
  assert.equal(canManageFarm({ userId: "u2", farm, membership }), true);
});
