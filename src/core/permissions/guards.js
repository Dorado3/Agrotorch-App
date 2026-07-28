/*
----------------------------------------------------
AgroTorch Permission Engine
Permission Guards
Version 1.0.0
----------------------------------------------------
*/

import { getRoles } from "../identity/roles.js";
import { hasPermission } from "./permissions.js";

export function can(permission) {

    const roles = getRoles();

    return roles.some(role =>
        hasPermission(role, permission)
    );

}

export function cannot(permission) {

    return !can(permission);

}
