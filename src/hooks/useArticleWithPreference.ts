// hooks/useArticlesWithPreferences.ts
import { useQuery } from "@tanstack/react-query";
import { ArticleFilters, ArticlesSourceString } from "../types";
import { fetchArticles, PreferenceService } from "../services";

export function useArticlesWithPreferences(
  source: ArticlesSourceString,
  userId: string
) {
  return useQuery({
    queryKey: ["articles", source, userId],
    queryFn: async () => {
      const preferences = await PreferenceService.getPreferences(userId);
      const filters: ArticleFilters = {
        author: preferences?.authors.join(",") || "",
        category: preferences?.categories.length
          ? preferences.categories[0]
          : undefined,
      };

      return fetchArticles(source, filters);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
