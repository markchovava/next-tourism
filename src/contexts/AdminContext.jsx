"use client"
import { AdvertInit, AdvertInitialState, AdvertReducer } from "@/reducers/AdvertReducer";
import { createContext, useContext, useReducer } from "react";


export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
    const [advertState, advertDispatch] = useReducer(AdvertReducer, AdvertInitialState, AdvertInit);
    
    return (
        <AdminContext.Provider value={{ 
            advertState, advertDispatch
        }}>
            {children}
        </AdminContext.Provider>
      )
}



export const AdminContextState = () => {
    return useContext(AdminContext);
}
 
