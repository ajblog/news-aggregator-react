import axios from "axios";
import { API_BASE_URLS } from "../../constants";
import {
  ArticleFilters,
  CategoryEnum,
  NormalizedArticlesResponse,
} from "../../types";

const API_KEYS: Record<string, string> = {
  newsapi: import.meta.env.VITE_NEWSAPI_KEY,
  guardian: import.meta.env.VITE_GUARDIAN_KEY,
  newyorktimes: import.meta.env.VITE_NEWYORKTIMES_KEY,
};

const PAGE_SIZE = 10;

const apiClient = axios.create({
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const fetchArticles = async (
  source: "newsapi" | "guardian" | "newyorktimes",
  filters: ArticleFilters
): Promise<NormalizedArticlesResponse> => {
  try {
    const baseUrl = API_BASE_URLS[source];
    const apiKey = API_KEYS[source];

    if (!baseUrl || !apiKey) throw new Error(`Invalid source: ${source}`);

    let endpoint = "";
    let params: Record<string, string | number> = {
      page: filters.page || 1,
      pageSize: PAGE_SIZE,
      q: filters.query || "",
    };

    switch (source) {
      case "newsapi":
        endpoint = "/everything";
        params.apiKey = apiKey;
        if (!filters.query) params.q = "news";
        // Include authors if available
        if (filters.author) {
          params.q += ` AND (${filters.author
            .split(",")
            .map((a) => `author:${a}`)
            .join(" OR ")})`;
        }

        // Include all categories if available
        if (filters.category && filters.category !== CategoryEnum.ALL) {
          params.q += ` AND (${filters.category.split(",").join(" OR ")})`;
        }

        // Handle date filtering
        if (filters.fromDate) {
          params.from = filters.fromDate;
        }
        break;

      case "guardian":
        endpoint = "/search";
        params["api-key"] = apiKey;
        params.pageSize = PAGE_SIZE;

        // Handle category filtering
        if (filters.category && filters.category !== CategoryEnum.ALL) {
          const categories = filters.category.split(",");
          const randomCategory =
            categories[Math.floor(Math.random() * categories.length)];

          params.section = randomCategory;
        }

        // Handle date filtering
        if (filters.fromDate) {
          params["from-date"] = filters.fromDate;
        }
        break;

      case "newyorktimes":
        endpoint = "/search/v2/articlesearch.json";
        params["api-key"] = apiKey;

        let fq = [];

        // Include authors
        if (filters.author) {
          fq.push(
            `byline:(${filters.author
              .split(",")
              .map((a) => `"${a}"`)
              .join(" OR ")})`
          );
        }

        // Include categories
        if (filters.category && filters.category !== CategoryEnum.ALL) {
          fq.push(
            `section_name:(${filters.category
              .split(",")
              .map((c) => `"${c}"`)
              .join(" OR ")})`
          );
        }

        // Add filtering queries if present
        if (fq.length) {
          params.fq = fq.join(" AND ");
        }

        if (filters.fromDate) {
          params.begin_date = filters.fromDate;
        }

        params.page = (filters.page || 1) - 1;
        break;

      default:
        throw new Error(`Unsupported source: ${source}`);
    }

    const response = await apiClient.get(`${baseUrl}${endpoint}`, { params });

    // Normalize response structure
    switch (source) {
      case "newsapi":
        return {
          articles: response.data.articles.map((article: any) => ({
            id: article.url,
            title: article.title,
            description: article.description || "No description available",
            url: article.url,
            imageUrl: article.urlToImage || undefined,
            source: article.source.name,
            publishedAt: article.publishedAt,
          })),
          totalPages: Math.ceil(response.data.totalResults / PAGE_SIZE),
        };

      case "guardian":
        return {
          articles: response.data.response.results.map((article: any) => ({
            id: article.id,
            title: article.webTitle,
            description: "No description available",
            url: article.webUrl,
            imageUrl: undefined,
            source: "The Guardian",
            publishedAt: article.webPublicationDate,
          })),
          totalPages: Math.ceil(response.data.response.total / PAGE_SIZE),
        };

      case "newyorktimes":
        return {
          articles: response.data.response.docs.map((article: any) => ({
            id: article._id,
            title: article.headline.main,
            description: article.abstract || "No description available",
            url: article.web_url,
            imageUrl: article.multimedia?.length
              ? `https://www.nytimes.com/${article.multimedia[0].url}`
              : undefined,
            source: "New York Times",
            publishedAt: article.pub_date,
          })),
          totalPages: Math.ceil(response.data.response.meta.hits / PAGE_SIZE),
        };

      default:
        throw new Error("Invalid source data");
    }
  } catch (error) {
    console.error(`Error fetching articles from ${source}:`, error);
    throw error;
  }
};
