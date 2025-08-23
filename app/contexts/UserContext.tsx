"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/app/firebase/firebase";
import { onAuthStateChanged, User as FireBaseUser } from "firebase/auth";
import {getDoc, doc} from "@firebase/firestore";
import User from "@/app/types/User";

type UserContextType = {
    uid: string | null;
    userName: string | null;
    email: string | null;
    isLoggedIn: boolean;
    isOwner: boolean | null;
}

const UserContext = createContext<UserContextType>({
    uid: "",
    userName: "",
    email: "",
    isLoggedIn: false,
    isOwner: null,
});

export const UserAuthContextProvider = ({children}: { children: React.ReactNode }) => {

    const [uid, setUid] = useState<string | null>("");
    const [email, setEmail] = useState<string | null>("");
    const [userName, setUserName] = useState<string | null>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean | null>(null);

    const resetUserStatus = () => {
        setUserName("");
        setEmail("");
        setUid("");
        setIsLoggedIn(false);
        setIsOwner(null);
    }

    // On page update listen if the auth state has changed on firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser: FireBaseUser | null) => {
            if (currentUser) {
                setUid(currentUser.uid);
                setEmail(currentUser.email);
                setUserName(currentUser.displayName)
                setIsLoggedIn(true);
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const user = docSnap.data() as User;
                    setIsOwner(user.role === "owner");
                }
            } else {
                resetUserStatus()
            }

        });
        return () => {
            unsubscribe();
        }

    }, []);


    return (
        <UserContext.Provider value = {{uid, userName, email, isLoggedIn, isOwner}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);