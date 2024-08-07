import React, {createContext, useEffect, useState} from "react";
import {User} from "src/types/types";
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: () => void;
    user: User | null;
    setUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: null,
    setUser: () => {},
});

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const username = Cookies.get('username');

    const [isAuthenticated, setIsAuthenticated] = useState(!!username);
    const [user, setUser] = useState<User>({email: username});

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
