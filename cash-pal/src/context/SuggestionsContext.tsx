import React from 'react';

export type SuggestionsContextType = string[];

const SuggestionsContext = React.createContext<SuggestionsContextType>([]);

export default SuggestionsContext;