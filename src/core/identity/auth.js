/*
----------------------------------------------------
AgroTorch Identity Engine
Authentication Service
Version 1.0.0
----------------------------------------------------
*/

let currentUser = null;

export function login(user) {

    currentUser = user;

    return currentUser;

}

export function logout() {

    currentUser = null;

}

export function isAuthenticated() {

    return currentUser !== null;

}

export function getCurrentUser() {

    return currentUser;

}
