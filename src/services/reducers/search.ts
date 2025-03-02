import { ArticlesSourceString, CategoryEnum, CategoryType } from "../../types";

// src/reducers/searchReducer.ts
export interface SearchState {
  query: string;
  category: CategoryType;
  author: string;
  fromDate: string;
  source: ArticlesSourceString;
  page: number;
}

export type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_CATEGORY"; payload: CategoryType }
  | { type: "SET_AUTHOR"; payload: string }
  | { type: "SET_FROM_DATE"; payload: string }
  | { type: "SET_SOURCE"; payload: ArticlesSourceString }
  | { type: "SET_PAGE"; payload: number }
  | { type: "RESET_ALL" };

export const initialState: SearchState = {
  query: "",
  category: CategoryEnum.ALL,
  author: "",
  fromDate: "",
  source: "newyorktimes",
  page: 1,
};

export function searchReducer(
  state: SearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_AUTHOR":
      return { ...state, author: action.payload };
    case "SET_FROM_DATE":
      return { ...state, fromDate: action.payload };
    case "SET_SOURCE":
      return { ...state, source: action.payload, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "RESET_ALL":
      return initialState;
    default:
      return state;
  }
}
