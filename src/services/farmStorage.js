/*
----------------------------------------------------
AgroTorch AgriOS
Farm Storage Service
Version 1.0.0
----------------------------------------------------
*/

const STORAGE_KEY = "agrotorch_farms";

export function getFarms() {

    const farms = localStorage.getItem(STORAGE_KEY);

    return farms ? JSON.parse(farms) : [];

}

export function saveFarm(farm) {

    const farms = getFarms();

    farms.push(farm);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(farms)
    );

}

export function deleteFarm(index){

    const farms = getFarms();

    farms.splice(index,1);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(farms)
    );

}

export function updateFarm(index,newFarm){

    const farms = getFarms();

    farms[index]=newFarm;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(farms)
    );

}

export function clearFarms(){

    localStorage.removeItem(STORAGE_KEY);

}