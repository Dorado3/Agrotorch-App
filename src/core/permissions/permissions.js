/*
----------------------------------------------------
AgroTorch Permission Engine
Permissions Service
Version 1.0.0
----------------------------------------------------
*/

const permissions = {};

export function setPermissions(role, items) {

    permissions[role] = items;

}

export function getPermissions(role) {

    return permissions[role] || [];

}

export function hasPermission(role, permission) {

    return getPermissions(role).includes(permission);

}

export function getAllPermissions() {

    return permissions;

}
