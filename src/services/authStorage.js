const USER_KEY = "agrotorch_user";

export function saveCurrentUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
}

export function logoutUser() {
    localStorage.removeItem(USER_KEY);
}

export function isLoggedIn() {
    return getCurrentUser() !== null;
}
