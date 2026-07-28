/*
----------------------------------------------------
AgroTorch Intelligence
Weather Model
Version 1.0.0
----------------------------------------------------
*/

export function createWeatherRecord(data = {}) {

    return {

        id: data.id || "",

        farmId: data.farmId || "",

        date: data.date || new Date().toISOString(),

        temperature: data.temperature || 0,

        humidity: data.humidity || 0,

        rainfall: data.rainfall || 0,

        windSpeed: data.windSpeed || 0,

        weatherCondition: data.weatherCondition || "",

        forecast: data.forecast || "",

        createdAt: data.createdAt || new Date().toISOString(),

        updatedAt: data.updatedAt || new Date().toISOString(),

        version: "1.0.0"

    };

}
