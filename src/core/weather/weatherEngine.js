/*
----------------------------------------------------
AgroTorch Weather Engine
Version 1.0.0
----------------------------------------------------
*/

export function getWeatherContext(farm) {

    return {

        location:
            farm.location || "Unknown",

        condition:
            "Sunny",

        temperature:
            30,

        humidity:
            65,

        rainfallProbability:
            10,

        recommendation:
            "Weather conditions are suitable for normal farm operations."

    };

}
