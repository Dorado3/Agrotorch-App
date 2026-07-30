/*
----------------------------------------------------
AgroTorch Knowledge Engine
Version 1.0.0
----------------------------------------------------
*/

import {

    getCropKnowledge

} from "../cropKnowledge/cropRegistry.js";

export function getKnowledge(cropName) {

    return getCropKnowledge(cropName);

}

export function getStage(cropName, week) {

    const knowledge =
        getKnowledge(cropName);

    if (!knowledge)
        return "Unknown";

    const stage =
        knowledge.stages.find(stage =>

            week >= stage.from &&

            week <= stage.to

        );

    return stage
        ? stage.name
        : "Unknown";

}

export function getTasks(cropName, week) {

    const knowledge =
        getKnowledge(cropName);

    if (!knowledge)
        return [];

    return knowledge.weeklyTasks[week] || [];

}

export function getPests(cropName) {

    const knowledge =
        getKnowledge(cropName);

    if (!knowledge)
        return [];

    return knowledge.majorPests;

}

export function getDiseases(cropName) {

    const knowledge =
        getKnowledge(cropName);

    if (!knowledge)
        return [];

    return knowledge.majorDiseases;

}
