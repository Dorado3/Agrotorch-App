/*
----------------------------------------------------
AgroTorch Kernel
Bootstrap
Version 2.0.0
----------------------------------------------------
*/

import { Kernel } from "./index.js";
import { registerService } from "./registry.js";

import * as Identity from "../identity/currentUser.js";
import * as Permissions from "../permissions/permissions.js";
import * as Events from "../events/eventBus.js";

import { loadDefaultRoles } from "../permissions/roles.js";

export function bootKernel() {

    console.log("");

    console.log("===================================");

    console.log("Starting " + Kernel.name);

    console.log("Version:", Kernel.version);

    console.log("===================================");

    registerService("identity", Identity);

    registerService("permissions", Permissions);

    registerService("events", Events);

    loadDefaultRoles();

    Kernel.status = "running";

    console.log("Kernel Running");

    console.log("Registered Services:");

    console.log(Object.keys({

        identity: Identity,

        permissions: Permissions,

        events: Events

    }));

    return Kernel;

}
