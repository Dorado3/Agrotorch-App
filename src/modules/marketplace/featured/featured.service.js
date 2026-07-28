/*
----------------------------------------------------
AgroTorch Marketplace
Featured Listing Service
Version 1.0.0
----------------------------------------------------
*/

import { createFeaturedListing } from "./featured.model.js";

export function buildFeaturedListing(data = {}) {

    return createFeaturedListing(data);

}

export function isFeaturedActive(featured) {

    if (!featured.expiresAt) {

        return true;

    }

    return new Date(featured.expiresAt) > new Date();

}
