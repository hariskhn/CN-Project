"use client"

import { app } from "@/firebase/firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextProviderType = {
    children: ReactNode;
}

type AuthContextType = {
    user: UserType | null;
}

type UserType = {
    email: string | null;
    uid: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: AuthContextProviderType) {
    const [user, setUser] = useState<UserType | null>(null);
    const route = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const {email, uid} = user;
                setUser({email, uid});
                route.push("/home")
            } else {
                setUser(null);
            }
        });
    }, [])

    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);