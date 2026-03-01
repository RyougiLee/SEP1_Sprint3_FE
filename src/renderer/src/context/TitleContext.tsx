import React from 'react';
import {createContext, useContext, useState} from "react";

const TitleContext = createContext(null);

export const TitleProvider = ({children}: any) => {
  const [title, setTitle] = useState('Title');
  return(
      <TitleContext.Provider value={{title, setTitle}}>
        {children}
      </TitleContext.Provider>
  )
}

export const useTitle = () => useContext(TitleContext)