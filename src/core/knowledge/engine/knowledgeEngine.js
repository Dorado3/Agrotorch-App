/*
----------------------------------------------------
AgroTorch Knowledge Engine
Version 1.0.0
----------------------------------------------------
*/

import { tomatoKnowledge } from "../vault/tomato.js";

export function getCropKnowledge(crop) {

    switch ((crop || "").toLowerCase()) {

        case "tomato":

            return tomatoKnowledge;

        default:

            return null;

    }

}
