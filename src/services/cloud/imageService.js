/*
----------------------------------------------------
AgroTorch Image Service
Version 1.0.0
----------------------------------------------------
*/

import { CLOUD } from "./config.js";

export async function uploadImage(file) {

    if (CLOUD.imageProvider !== "imgbb") {

        throw new Error("Unsupported image provider.");

    }

    throw new Error("ImgBB upload not configured yet.");

}
