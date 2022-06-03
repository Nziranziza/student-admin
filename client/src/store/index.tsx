import { createContext, ReactNode, useReducer } from 'react';

import { studentReducer } from './reducers';

const initialState: any = {
  students: {
    page: 1,
    pages: 1,
    pageSize: 10,
    count: 0,
    data: []
  },
};

type StoreProviderProps = {
  children: ReactNode;
};

export const Store = createContext(initialState);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  );
};
