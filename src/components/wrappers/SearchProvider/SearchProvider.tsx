// src/context/SearchContext.tsx
import React, { createContext, useReducer, useContext } from "react";
import {
  searchReducer,
  SearchState,
  SearchAction,
  initialState,
} from "../../../services/index";

interface SearchContextType {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
