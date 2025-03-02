import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../services";
import { ArticleFilters, NormalizedArticlesResponse } from "../types";

export const useArticles = (
  source: "newsapi" | "guardian" | "newyorktimes",
  filters: ArticleFilters
) => {
  return useQuery<NormalizedArticlesResponse>({
    queryKey: ["articles", source, filters],
    queryFn: () => fetchArticles(source, filters),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
