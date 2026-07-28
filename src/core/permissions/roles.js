/*
----------------------------------------------------
AgroTorch Permission Engine
Default Roles
Version 1.0.0
----------------------------------------------------
*/

import { setPermissions } from "./permissions.js";

export function loadDefaultRoles() {

    setPermissions("admin", [

        "*"

    ]);

    setPermissions("farmer", [

        "create_farm",
        "edit_farm",
        "record_activity",
        "record_harvest",
        "view_dashboard"

    ]);

    setPermissions("seller", [

        "create_store",
        "manage_products",
        "manage_inventory",
        "view_orders"

    ]);

}
