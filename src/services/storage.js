// =============================================
// AgroTorch AgriOS
// Storage Service
// Version 0.2
// =============================================

const STORAGE_KEY = "agrotorch_farms";

// ---------------------------------------------
// Load all farms
// ---------------------------------------------
export function getFarms() {

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {

    return JSON.parse(data);

  } catch (error) {

    console.error("Storage Error:", error);

    return [];

  }

}

// ---------------------------------------------
// Save all farms
// ---------------------------------------------
export function saveFarms(farms) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(farms)
  );

}

// ---------------------------------------------
// Add one farm
// ---------------------------------------------
export function addFarm(farm) {

  const farms = getFarms();

  farms.push({

    id: Date.now(),

    name: farm.name,

    location: farm.location,

    crop: farm.crop,

    size: farm.size,

    createdAt: new Date().toISOString()

  });

  saveFarms(farms);

}

// ---------------------------------------------
// Delete Farm
// ---------------------------------------------
export function deleteFarm(id) {

  const farms = getFarms().filter(

    farm => farm.id !== id

  );

  saveFarms(farms);

}

// ---------------------------------------------
// Update Farm
// ---------------------------------------------
export function updateFarm(updatedFarm) {

  const farms = getFarms().map(farm => {

    if (farm.id === updatedFarm.id) {

      return updatedFarm;

    }

    return farm;

  });

  saveFarms(farms);

}

// ---------------------------------------------
// Get One Farm
// ---------------------------------------------
export function getFarm(id) {

  const farms = getFarms();

  return farms.find(

    farm => farm.id === id

  );

}

// =============================================
// END
// =============================================
