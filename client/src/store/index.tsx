import { createContext, ReactNode, useReducer, Context } from 'react';

import reducer from './reducers';
import initialState, { State } from './initialState';


type StoreProviderProps = {
  children: ReactNode;
};

type StoreValue = {
  state: State,
  dispatch: any
}

export const Store: Context<StoreValue>  = createContext({
  state: initialState,
  dispatch: () => {}
});

export const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  );
};
