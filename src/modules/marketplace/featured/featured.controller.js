/*
----------------------------------------------------
AgroTorch Marketplace
Featured Controller
Version 1.0.0
----------------------------------------------------
*/

import { FeaturedRepository } from "./featured.repository.js";

export const FeaturedController = {

    createFeatured(data) {

        return FeaturedRepository.create(data);

    },

    getFeaturedListings() {

        return FeaturedRepository.all();

    },

    getFeatured(id) {

        return FeaturedRepository.find(id);

    },

    updateFeatured(id, updates) {

        return FeaturedRepository.update(id, updates);

    },

    deleteFeatured(id) {

        return FeaturedRepository.delete(id);

    }

};
