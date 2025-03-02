import { CategoryType } from "./categories.types";

// types.ts
export type ArticlesSourceString = "newsapi" | "guardian" | "newyorktimes";
export enum ArticlesSourcesEnum {
  NEWSAPI = "newsapi",
  GUARDIAN = "guardian",
  NEWYORKTIMES = "newyorktimes",
}

export type ArticleFilters = {
  category?: CategoryType;
  author?: string;
  query?: string;
  page?: number;
  pageSize?: number;
  fromDate?: string; // Added from date filter
};

export type NormalizedArticlesResponse = {
  articles: Article[];
  totalPages: number;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
};
