/*
----------------------------------------------------
AgroTorch AgriOS
Farm Storage Service
Version 2.0.0
----------------------------------------------------
*/

import { getCurrentUserId } from "./userService.js";

const STORAGE_KEY = "agrotorch_farms";

export function getFarms() {

    const farms =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId = getCurrentUserId();

    return farms.filter(farm => farm.userId === userId);

}

export function saveFarm(farm) {

    const farms =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    farm.userId = getCurrentUserId();

    farms.push(farm);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(farms)
    );

}

export function deleteFarm(index){

    const farms =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId = getCurrentUserId();

    const myFarms = farms.filter(farm => farm.userId === userId);

    const farmToDelete = myFarms[index];

    const updated = farms.filter(farm => farm !== farmToDelete);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );

}

export function updateFarm(index,newFarm){

    const farms =
        JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const userId = getCurrentUserId();

    const myFarms = farms.filter(farm => farm.userId === userId);

    const oldFarm = myFarms[index];

    const realIndex = farms.indexOf(oldFarm);

    newFarm.userId = userId;

    farms[realIndex] = newFarm;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(farms)
    );

}

export function clearFarms(){

    localStorage.removeItem(STORAGE_KEY);

}
