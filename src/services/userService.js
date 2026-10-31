import { auth } from "../core/config/firebase.js";

/*
 * Firebase Auth is the sole source of identity.
 * Never fall back to a cached display name or stale local profile after logout.
 */
export function getCurrentUserId() {
  return auth.currentUser?.uid || null;
}
