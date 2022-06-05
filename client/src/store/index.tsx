import { createContext, ReactNode, useReducer } from 'react';

import reducer from './reducers';
import initialState from './initialState';


type StoreProviderProps = {
  children: ReactNode;
};

export const Store = createContext(initialState);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  );
};
