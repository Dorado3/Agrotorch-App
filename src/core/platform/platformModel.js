/**
 * AgroTorch AgriOS shared domain model.
 * Stable vocabulary shared by farm, enterprise, intelligence and programme modules.
 * This module performs validation only; trusted backend rules/services enforce access.
 */
export const PLATFORM_SCHEMA_VERSION = 1;
export const ACCOUNT_TYPES = Object.freeze({ INDIVIDUAL: "individual", ORGANISATION: "organisation" });
export const ORGANISATION_TYPES = Object.freeze(["farm_business", "cooperative", "agribusiness", "ngo", "government", "research", "development_programme", "service_provider"]);
export const PLATFORM_ROLES = Object.freeze(["owner", "organisation_admin", "farm_manager", "supervisor", "agronomist", "field_agent", "finance_officer", "viewer"]);
export const MEMBERSHIP_STATUSES = Object.freeze(["invited", "active", "suspended", "removed"]);
export const FARM_STATUSES = Object.freeze(["active", "planned", "fallow", "closed"]);
export const CROP_CYCLE_STATUSES = Object.freeze(["planned", "active", "harvest", "completed", "terminated"]);
const text = value => typeof value === "string" ? value.trim() : "";
const validDate = value => !value || !Number.isNaN(Date.parse(value));

export function createOrganisation(input = {}, actorId = "") {
  const name = text(input.name), type = text(input.type);
  if (!name) throw new Error("Organisation name is required.");
  if (!ORGANISATION_TYPES.includes(type)) throw new Error("Choose a supported organisation type.");
  if (!text(actorId)) throw new Error("An authenticated creator is required.");
  return { schemaVersion: PLATFORM_SCHEMA_VERSION, name, type, legalName: text(input.legalName), registrationNumber: text(input.registrationNumber), countryCode: text(input.countryCode || "NG").toUpperCase(), state: text(input.state), website: text(input.website), createdBy: text(actorId), status: "active", createdAt: input.createdAt || null, updatedAt: input.updatedAt || null };
}

export function createMembership(input = {}) {
  const organisationId = text(input.organisationId), userId = text(input.userId), role = text(input.role);
  if (!organisationId || !userId) throw new Error("Organisation and user are required.");
  if (!PLATFORM_ROLES.includes(role)) throw new Error("Unsupported platform role.");
  return { schemaVersion: PLATFORM_SCHEMA_VERSION, organisationId, userId, role, status: MEMBERSHIP_STATUSES.includes(input.status) ? input.status : "invited", farmIds: Array.isArray(input.farmIds) ? [...new Set(input.farmIds.map(text).filter(Boolean))] : [], invitedBy: text(input.invitedBy), createdAt: input.createdAt || null, updatedAt: input.updatedAt || null };
}

export function normaliseFarm(farm = {}) {
  const areaValue = farm.areaHectares ?? farm.hectares;
  const area = areaValue === "" || areaValue == null ? null : Number(areaValue);
  return {
    ...farm,
    id: text(farm.id),
    ownerId: text(farm.ownerId || farm.userId),
    organisationId: text(farm.organisationId) || null,
    schemaVersion: Number(farm.schemaVersion) || PLATFORM_SCHEMA_VERSION,
    status: FARM_STATUSES.includes(farm.status) ? farm.status : "active",
    areaHectares: area === null ? null : (Number.isFinite(area) && area >= 0 ? area : null),
    blocks: Array.isArray(farm.blocks) ? farm.blocks : [],
    cropCycles: Array.isArray(farm.cropCycles) ? farm.cropCycles : []
  };
}

export function createFarmBlock(input = {}, farmId = "", actorId = "") {
  const name = text(input.name);
  if (!text(farmId) || !text(actorId)) throw new Error("Farm and authenticated creator are required.");
  if (!name) throw new Error("Block name is required.");
  const areaHectares = input.areaHectares === "" || input.areaHectares == null ? null : Number(input.areaHectares);
  if (areaHectares !== null && (!Number.isFinite(areaHectares) || areaHectares <= 0)) throw new Error("Block area must be greater than zero.");
  return { id: text(input.id) || null, farmId: text(farmId), name, code: text(input.code), areaHectares, crop: text(input.crop), variety: text(input.variety), irrigationType: text(input.irrigationType), soilType: text(input.soilType), status: input.status === "inactive" ? "inactive" : "active", createdBy: text(actorId), createdAt: input.createdAt || null };
}

export function createCropCycle(input = {}, farmId = "", blockId = "", actorId = "") {
  const crop = text(input.crop), plantingDate = text(input.plantingDate);
  if (!text(farmId) || !text(actorId)) throw new Error("Farm and authenticated creator are required.");
  if (!crop) throw new Error("Crop is required.");
  if (!validDate(plantingDate)) throw new Error("Planting date is invalid.");
  return { id: text(input.id) || null, farmId: text(farmId), blockId: text(blockId) || null, crop, variety: text(input.variety), productionMethod: text(input.productionMethod), plantingDate: plantingDate || null, expectedHarvestDate: text(input.expectedHarvestDate) || null, actualHarvestStartDate: text(input.actualHarvestStartDate) || null, status: CROP_CYCLE_STATUSES.includes(input.status) ? input.status : "planned", createdBy: text(actorId), createdAt: input.createdAt || null };
}

/** UI visibility helper only. Firestore rules/server authorization remain the security boundary. */
export function canViewFarm({ userId, farm, membership } = {}) {
  if (!text(userId) || !farm) return false;
  if (text(farm.ownerId || farm.userId) === text(userId)) return true;
  if (!text(farm.organisationId) || !membership) return false;
  return text(membership.organisationId) === text(farm.organisationId) && text(membership.userId) === text(userId) && membership.status === "active" && PLATFORM_ROLES.includes(membership.role);
}

export function canManageFarm({ userId, farm, membership } = {}) {
  if (!canViewFarm({ userId, farm, membership })) return false;
  if (text(farm.ownerId || farm.userId) === text(userId)) return true;
  return ["owner", "organisation_admin", "farm_manager"].includes(text(membership?.role));
}
