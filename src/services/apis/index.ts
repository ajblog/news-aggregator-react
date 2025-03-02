import axios from "axios";
import { API_BASE_URLS } from "../../constants";
import { ArticleFilters } from "../../types";

const API_KEYS: Record<string, string> = {
  newsapi: import.meta.env.VITE_NEWSAPI_KEY,
  guardian: import.meta.env.VITE_GUARDIAN_KEY,
  newyorktimes: import.meta.env.VITE_NEWYORKTIMES_KEY,
};

const apiClient = axios.create({
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const fetchArticles = async (
  source: "newsapi" | "guardian" | "newyorktimes",
  filters: ArticleFilters
) => {
  try {
    const baseUrl = API_BASE_URLS[source];
    const apiKey = API_KEYS[source];
    if (!baseUrl || !apiKey) throw new Error(`Invalid source: ${source}`);

    let endpoint = "";
    let params: Record<string, string | number> = {
      page: filters.page!,
      pageSize: filters.pageSize!,
    };

    switch (source) {
      case "newsapi":
        endpoint = "/everything";
        params = {
          ...params,
          apiKey,
          q: filters.query || "",
          category: filters.category || "",
          author: filters.author || "",
        };
        break;

      case "guardian":
        endpoint = "/search";
        params = {
          ...params,
          "api-key": apiKey,
          q: filters.query ? filters.query.replace(/\s+/g, ",") : "",
        };
        if (filters.category) params.section = filters.category;
        break;

      case "newyorktimes":
        endpoint = "/search/v2/articlesearch.json";
        params = {
          ...params,
          "api-key": apiKey,
          q: filters.query || "",
          fq: filters.category ? `news_desk:("${filters.category}")` : "",
        };
        break;

      default:
        throw new Error(`Unsupported source: ${source}`);
    }

    const response = await apiClient.get(`${baseUrl}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching articles from ${source}:`, error);
    throw error;
  }
};
