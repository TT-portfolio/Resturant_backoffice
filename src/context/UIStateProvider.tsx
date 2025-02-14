'use client'

import { createContext, useState, useContext, ReactNode } from 'react';

interface UIStateContextProps {
    selectedFilter : string;
    setSelectedFilter: (filter: string) => void;
}

const UIStateContext = createContext<UIStateContextProps | undefined>(undefined);

export function UIStateProvider({ children} : {children: ReactNode}) {
    const [selectedFilter, setSelectedFilter] = useState<string>("Dashboard");

    return (
        <UIStateContext.Provider value={{ selectedFilter, setSelectedFilter}}>
            {children}
        </UIStateContext.Provider>    
    );
}

export function useUIState () {
    const context = useContext(UIStateContext);
    if(!context) {
        throw new Error("useUIState must be used within a UIStatePorvider");
    }
    return context;
}