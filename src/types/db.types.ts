import { ArticlesSourceString } from "./articles.types";
import { CategoryType } from "./categories.types";

// idb.ts
export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

export interface Preference {
  id: string;
  userId: string;
  authors: string[];
  categories: CategoryType[];
  sources: ArticlesSourceString[];
}
