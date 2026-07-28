/*
----------------------------------------------------
AgroTorch Identity Engine
User Profile Service
Version 1.0.0
----------------------------------------------------
*/

let profile = {};

export function setProfile(userProfile) {

    profile = userProfile;

    return profile;

}

export function getProfile() {

    return profile;

}

export function updateProfile(data) {

    profile = {

        ...profile,

        ...data

    };

    return profile;

}

export function clearProfile() {

    profile = {};

}
