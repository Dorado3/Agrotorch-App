/*
----------------------------------------------------
AgroTorch Kernel
Core Entry Point
Version 1.0.0
----------------------------------------------------
*/

export const Kernel = {

    name: "AgroTorch Kernel",

    version: "1.0.0",

    status: "booting"

};

export function getKernelInfo() {

    return {

        ...Kernel,

        startedAt: new Date().toISOString()

    };

}
