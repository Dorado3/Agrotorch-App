/*
----------------------------------------------------
AgroTorch Navigation Service
Version 1.0.0
----------------------------------------------------
*/

let navigator = null;

export function registerNavigator(fn) {

    navigator = fn;

}

export function navigate(page) {

    if (navigator) {

        navigator(page);

    }

}
