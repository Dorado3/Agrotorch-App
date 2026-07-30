/*
----------------------------------------------------
AgroTorch Farm Calendar Engine
Version 1.0.0
----------------------------------------------------
*/

export function getFarmDay(plantingDate) {

    if (!plantingDate) return 0;

    const planted =
        new Date(plantingDate);

    const today =
        new Date();

    const difference =
        today - planted;

    return Math.floor(

        difference /

        (1000 * 60 * 60 * 24)

    );

}

export function getFarmWeek(plantingDate) {

    return Math.ceil(

        getFarmDay(plantingDate) / 7

    );

}
