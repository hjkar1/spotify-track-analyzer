import { createContext, useContext } from 'react';

export const AppContext = createContext();

export const useContextState = () => useContext(AppContext);
