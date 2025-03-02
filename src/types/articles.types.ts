export type ArticlesSourceString = "newsapi" | "guardian" | "newyorktimes";
export type ArticleFilters = {
  category?: string;
  author?: string;
  query?: string;
  page?: number;
  pageSize?: number;
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
