/*
----------------------------------------------------
AgroTorch Crop Knowledge Registry
Version 1.0.0
----------------------------------------------------
*/

import { TomatoKnowledge } from "./tomato.js";
import { PepperKnowledge } from "./pepper.js";
import { CucumberKnowledge } from "./cucumber.js";
import { MaizeKnowledge } from "./maize.js";
import { CassavaKnowledge } from "./cassava.js";

export const CropKnowledgeRegistry = {

    tomato: TomatoKnowledge,

    pepper: PepperKnowledge,

    cucumber: CucumberKnowledge,

    maize: MaizeKnowledge,

    cassava: CassavaKnowledge

};

export function getCropKnowledge(cropName) {

    if (!cropName) return null;

    const key =
        cropName
            .toLowerCase()
            .trim();

    return CropKnowledgeRegistry[key] || null;

}
