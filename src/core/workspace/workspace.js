/*
----------------------------------------------------
AgroTorch Workspace Engine
Version 1.0.0
----------------------------------------------------
*/

import { auth } from "../config/firebase.js";
import { getUserFarms } from "../../firestore/FarmFirestore.js";

const workspace = {

    user: null,

    farms: [],

    activeFarm: null

};

export async function loadWorkspace() {

    const user = auth.currentUser;

    if (!user) {

        workspace.user = null;
        workspace.farms = [];
        workspace.activeFarm = null;

        return workspace;

    }

    workspace.user = user;

    workspace.farms = await getUserFarms(user.uid);

    workspace.activeFarm =
        workspace.farms.length > 0
            ? workspace.farms[0]
            : null;

    return workspace;

}

export function getWorkspace() {

    return workspace;

}

export function setActiveFarm(farm) {

    workspace.activeFarm = farm;

}
