"use client"
import React, { createContext, ReactNode, useContext } from 'react'
type Props = {
 children:ReactNode
}
type ValueProps = {
    isAuthenticated:boolean
}
const AuthContext = createContext<ValueProps | null>(null)
export const AuthProvider = ({children}: Props) => {

    const valueData:ValueProps = {
        isAuthenticated:true
    }
    return ( 
        <AuthContext.Provider value={valueData}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
 