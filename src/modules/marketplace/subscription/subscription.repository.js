/*
----------------------------------------------------
AgroTorch Marketplace
Subscription Repository
Version 1.0.0
----------------------------------------------------
*/

import { buildSubscription } from "./subscription.service.js";

const subscriptions = [];

export const SubscriptionRepository = {

    create(data) {

        const subscription = buildSubscription(data);

        subscriptions.push(subscription);

        return subscription;

    },

    all() {

        return subscriptions;

    },

    find(id) {

        return subscriptions.find(

            subscription => subscription.id === id

        );

    },

    update(id, updates) {

        const index = subscriptions.findIndex(

            subscription => subscription.id === id

        );

        if (index === -1) {

            return null;

        }

        subscriptions[index] = {

            ...subscriptions[index],

            ...updates,

            updatedAt: new Date().toISOString()

        };

        return subscriptions[index];

    },

    delete(id) {

        const index = subscriptions.findIndex(

            subscription => subscription.id === id

        );

        if (index === -1) {

            return false;

        }

        subscriptions.splice(index, 1);

        return true;

    }

};
