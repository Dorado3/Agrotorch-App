/*
----------------------------------------------------
AgroTorch System
Audit Service
Version 1.0.0
----------------------------------------------------
*/

import { createAuditLog } from "./audit.model.js";

export function buildAuditLog(data = {}) {

    return createAuditLog(data);

}
