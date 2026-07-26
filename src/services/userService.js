import { getCurrentUser } from "./authStorage.js";

export function getCurrentUserId() {

    const user = getCurrentUser();

    if (!user) {

        return null;

    }

    return user.name.toLowerCase().trim();

}
