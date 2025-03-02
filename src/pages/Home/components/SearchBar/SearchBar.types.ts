import { ArticlesSourceString } from "../../../../types";

export interface SearchBarPropTypes {
  query: string;
  setQuery: (query: string) => void;
  source: string;
  setSource: (source: ArticlesSourceString) => void;
}
