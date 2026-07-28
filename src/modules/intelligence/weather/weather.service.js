/*
----------------------------------------------------
AgroTorch Intelligence
Weather Service
Version 1.0.0
----------------------------------------------------
*/

import { createWeatherRecord } from "./weather.model.js";

export function buildWeatherRecord(data = {}) {

    return createWeatherRecord(data);

}

export function shouldIrrigate(weather) {

    return weather.rainfall < 5;

}

export function rainExpected(weather) {

    return weather.forecast === "rain";

}
