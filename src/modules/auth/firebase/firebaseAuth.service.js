/*
----------------------------------------------------
AgroTorch Firebase Authentication
Version 1.0.0
----------------------------------------------------
*/

import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

signOut,

sendPasswordResetEmail,

onAuthStateChanged

} from "firebase/auth";

import { auth } from "../../../core/config/firebase.js";

export async function register(email,password){

return createUserWithEmailAndPassword(

auth,

email,

password

);

}

export async function login(email,password){

return signInWithEmailAndPassword(

auth,

email,

password

);

}

export async function logout(){

return signOut(auth);

}

export async function resetPassword(email){

return sendPasswordResetEmail(

auth,

email

);

}

export function authListener(callback){

return onAuthStateChanged(

auth,

callback

);

}

