import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../services";

type ArticleFilters = {
  category?: string;
  author?: string;
  query?: string;
};

export const useArticles = (
  source: "newsapi" | "guardian" | "newyorktimes",
  filters: ArticleFilters
) => {
  return useQuery({
    queryKey: ["articles", source, filters], // Unique cache key per source & filters
    queryFn: () => fetchArticles(source, filters),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
