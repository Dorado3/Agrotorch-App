/*
----------------------------------------------------
AgroTorch Identity Engine
Current User Service
Version 1.0.0
----------------------------------------------------
*/

import { getCurrentUser } from "./auth.js";
import { getProfile } from "./profile.js";
import { getRoles } from "./roles.js";
import { getSession } from "./session.js";

export function currentUser() {

    return {

        user: getCurrentUser(),

        profile: getProfile(),

        roles: getRoles(),

        session: getSession()

    };

}
