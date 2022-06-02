import { createContext, ReactNode } from 'react';

const initialState = {
  students: [],
};

type StoreProviderProps = {
  children: ReactNode;
};

export const Store = createContext(initialState);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Store.Provider value={initialState}>{children}</Store.Provider>;
};
