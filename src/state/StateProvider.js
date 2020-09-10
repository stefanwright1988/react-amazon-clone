import React, { createContext, useContext, useReducer } from "react";

//prepare the context
export const StateContext = createContext();

//wrap our app and provide the context
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull info from the context
export const useStateValue = () => useContext(StateContext);
