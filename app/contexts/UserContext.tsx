"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/app/firebase/firebase";
import { onAuthStateChanged, User as FireBaseUser } from "firebase/auth";

type UserContextType = {
    uid: string | null;
    userName: string | null;
    email: string | null;
    isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType>({
    uid: "",
    userName: "",
    email: "",
    isLoggedIn: false,
});

export const UserAuthContextProvider = ({children}: { children: React.ReactNode }) => {

    const [uid, setUid] = useState<string | null>("");
    const [email, setEmail] = useState<string | null>("");
    const [userName, setUserName] = useState<string | null>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const resetUserStatus = () => {
        setUserName("");
        setEmail("");
        setUid("");
        setIsLoggedIn(false);
    }

    // On page update listen if the auth state has changed on firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser: FireBaseUser | null) => {
            if (currentUser) {
                setUid(currentUser.uid);
                setEmail(currentUser.email);
                setUserName(currentUser.displayName)
                setIsLoggedIn(true);
            } else {
                resetUserStatus()
            }

        });
        return () => {
            unsubscribe();
        }

    }, []);


    return (
        <UserContext.Provider value = {{uid, userName, email, isLoggedIn}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);