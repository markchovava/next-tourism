"use client"
import { AdvertInit, AdvertInitialState, AdvertReducer } from "@/reducers/AdvertReducer";
import { PlaceInit, PlaceInitialState, PlaceReducer } from "@/reducers/PlaceReducer";
import { createContext, useContext, useReducer } from "react";


export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
    const [advertState, advertDispatch] = useReducer(AdvertReducer, AdvertInitialState, AdvertInit);
    const [placeState, placeDispatch] = useReducer(PlaceReducer, PlaceInitialState, PlaceInit);
    
    return (
        <AdminContext.Provider value={{ 
            advertState, advertDispatch,
            placeState, placeDispatch
        }}>
            {children}
        </AdminContext.Provider>
      )
}



export const AdminContextState = () => {
    return useContext(AdminContext);
}
 
