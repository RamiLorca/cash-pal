import React, { ReactNode, createContext, useContext, useState } from 'react';

interface SuggestionsContextType {
    suggestions: string[];
    setNewSuggestions: (newSuggestions: string[]) => void;
}

const SuggestionsContext = createContext<SuggestionsContextType | undefined>(undefined);

export const SuggestionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const setNewSuggestions = (newSuggestions: string[]) => {
        setSuggestions(newSuggestions);
    };

    const contextValue: SuggestionsContextType = {
        suggestions,
        setNewSuggestions,
    };

    return <SuggestionsContext.Provider value={contextValue}>{children}</SuggestionsContext.Provider>;
};

export const useSuggestions = (): SuggestionsContextType => {
    const context = useContext(SuggestionsContext);
    if(!context) {
        throw new Error('useSuggestions must be used within a SuggestionsProvider');
    }
    return context;
};