// import { createContext } from "react";


// export const AuthContext = createContext()

// AuthContext.js

// import * as userService from '../../src/service/userService'
// import * as postService from '../../src/service/postService'

import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [auth, setAuth] = useLocalStorage('auth', {})

    const userLogin = (authData) => {
        setAuth(authData)
    }
    const userRegister = (authData) => {
        setAuth(authData)
    }
    const userLogout = () => {
        localStorage.clear()
        setAuth({})
        navigate('/posts')
    }





    const context = {
        auth, userLogin, userLogout, userRegister, isAuthenticated: !!auth.payload

    }
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
