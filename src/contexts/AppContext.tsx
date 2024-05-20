import React, {createContext, useEffect, useState} from 'react';
//import useAuth from '../hooks/useAuth';

type AppContextProps = {
  isLoading: boolean;
  setIsLoading: any;
};
export const AppContext = createContext({} as AppContextProps);
export const AppContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <AppContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </AppContext.Provider>
  );
};
