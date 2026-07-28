/*
----------------------------------------------------
AgroTorch Authentication
Service
Version 1.0.0
----------------------------------------------------
*/

import { createUser } from "./auth.model.js";

export function buildUser(data = {}) {

    return createUser(data);

}

export function dashboardForRole(role) {

    switch(role) {

        case "farmer":

            return "/dashboard/farmer";

        case "seller":

            return "/dashboard/seller";

        case "admin":

            return "/dashboard/admin";

        case "ceo":

            return "/dashboard/ceo";

        default:

            return "/";

    }

}
