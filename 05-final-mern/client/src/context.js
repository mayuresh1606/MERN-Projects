import React, { useState, useContext } from "react";


const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    return <AppContext.Provider value={{token, setToken}}>{ children }</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}