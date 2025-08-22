import { auth, db } from "./firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    User
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

/**
 * Sign in with given email and password
 */
export function executeSignInWithEmailAndPassword(
    email: string,
    password: string
): Promise<{ user: User }> {
    return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Register with email & password and assign a role
 */
export async function executeRegisterWithEmailAndPassword(
    userName: string,
    email: string,
    password: string,
    role: string
): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, {
        displayName: userName,
    });

    const newUser = {
        uid: userCredential.user.uid,
        userName: userName,
        email: email,
        role: role
    };

    // Add the role to the user collection
    await setDoc(doc(db, "users", newUser.uid), newUser);

    // Force sign out to ask the user to sign in again after creation
    await auth.signOut();
}

export function executeSignOut() {
    return auth.signOut();
}

