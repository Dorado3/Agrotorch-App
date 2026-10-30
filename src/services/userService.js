import { auth } from "../core/config/firebase.js";
import { getCurrentUser } from "./authStorage.js";

export function getCurrentUserId() {
  return auth.currentUser?.uid || getCurrentUser()?.uid || getCurrentUser()?.id || null;
}
