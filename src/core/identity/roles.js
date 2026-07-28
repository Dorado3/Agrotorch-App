/*
----------------------------------------------------
AgroTorch Identity Engine
Roles Service
Version 1.0.0
----------------------------------------------------
*/

let roles = [];

export function setRoles(userRoles) {

    roles = userRoles;

    return roles;

}

export function getRoles() {

    return roles;

}

export function hasRole(role) {

    return roles.includes(role);

}

export function clearRoles() {

    roles = [];

}
