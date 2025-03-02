export type ArticlesSourceString = "newsapi" | "guardian" | "newyorktimes";
export type ArticleFilters = {
  category?: string;
  author?: string;
  query?: string;
  page?: number;
  pageSize?: number;
};
