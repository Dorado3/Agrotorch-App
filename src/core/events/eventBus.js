/*
----------------------------------------------------
AgroTorch Event Bus
Version 1.0.0
----------------------------------------------------
*/

const listeners = {};

export function subscribe(event, callback) {

    if (!listeners[event]) {

        listeners[event] = [];

    }

    listeners[event].push(callback);

}

export function publish(event, data) {

    if (!listeners[event]) return;

    listeners[event].forEach(callback => {

        callback(data);

    });

}

export function getListeners() {

    return listeners;

}
