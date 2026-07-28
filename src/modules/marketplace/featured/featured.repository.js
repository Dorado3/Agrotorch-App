/*
----------------------------------------------------
AgroTorch Marketplace
Featured Repository
Version 1.0.0
----------------------------------------------------
*/

import { buildFeaturedListing } from "./featured.service.js";

const featuredListings = [];

export const FeaturedRepository = {

    create(data) {

        const listing = buildFeaturedListing(data);

        featuredListings.push(listing);

        return listing;

    },

    all() {

        return featuredListings;

    },

    find(id) {

        return featuredListings.find(

            listing => listing.id === id

        );

    },

    update(id, updates) {

        const index = featuredListings.findIndex(

            listing => listing.id === id

        );

        if (index === -1) {

            return null;

        }

        featuredListings[index] = {

            ...featuredListings[index],

            ...updates,

            updatedAt: new Date().toISOString()

        };

        return featuredListings[index];

    },

    delete(id) {

        const index = featuredListings.findIndex(

            listing => listing.id === id

        );

        if (index === -1) {

            return false;

        }

        featuredListings.splice(index, 1);

        return true;

    }

};
