/*
----------------------------------------------------
AgroTorch Marketplace
Subscription Controller
Version 1.0.0
----------------------------------------------------
*/

import { SubscriptionRepository } from "./subscription.repository.js";

export const SubscriptionController = {

    createSubscription(data) {

        return SubscriptionRepository.create(data);

    },

    getSubscriptions() {

        return SubscriptionRepository.all();

    },

    getSubscription(id) {

        return SubscriptionRepository.find(id);

    },

    updateSubscription(id, updates) {

        return SubscriptionRepository.update(id, updates);

    },

    deleteSubscription(id) {

        return SubscriptionRepository.delete(id);

    }

};
