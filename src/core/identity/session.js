/*
----------------------------------------------------
AgroTorch Identity Engine
Session Service
Version 1.0.0
----------------------------------------------------
*/

let session = {

    active: false,

    startedAt: null

};

export function startSession() {

    session.active = true;

    session.startedAt = new Date().toISOString();

    return session;

}

export function endSession() {

    session.active = false;

    session.startedAt = null;

}

export function getSession() {

    return session;

}

export function isSessionActive() {

    return session.active;

}
