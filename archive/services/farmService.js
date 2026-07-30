const STORAGE_KEY = "agrotorch_farms";

export function getFarms() {
  const farms = localStorage.getItem(STORAGE_KEY);

  if (!farms) {
    return [];
  }

  return JSON.parse(farms);
}

export function saveFarm(farm) {
  const farms = getFarms();

  farm.id = Date.now();

  farms.push(farm);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(farms)
  );
}

export function deleteFarm(id) {
  const farms = getFarms().filter(
    farm => farm.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(farms)
  );
}

export function updateFarm(updatedFarm) {
  const farms = getFarms().map(farm => {
    if (farm.id === updatedFarm.id) {
      return updatedFarm;
    }

    return farm;
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(farms)
  );
}
