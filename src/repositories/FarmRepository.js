/*
 * AgroTorch Farm Repository
 */
import { getFarms, saveFarm, updateFarm, deleteFarm } from "../services/farmStorage.js";
import { createFarm, getUserFarms, getAllFarms } from "../firestore/FarmFirestore.js";

export const FarmRepository = {
  all() {
    return getFarms();
  },
  async allCloud() {
    return getAllFarms();
  },
  async userFarms(ownerId) {
    return getUserFarms(ownerId);
  },
  async create(ownerId, farm) {
    // Save locally only after Firestore returns the canonical farm ID.
    const reference = await createFarm(ownerId, farm);
    saveFarm({ ...farm, id: reference.id, ownerId });
    return reference;
  },
  update(index, farm) {
    return updateFarm(index, farm);
  },
  delete(index) {
    return deleteFarm(index);
  }
};
