/*
----------------------------------------------------
AgroTorch Kernel
Service Registry
Version 1.0.0
----------------------------------------------------
*/

const services = {};

export function registerService(name, service) {

    services[name] = service;

}

export function getService(name) {

    return services[name];

}

export function getAllServices() {

    return services;

}
