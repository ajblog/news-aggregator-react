// fetchArticles.ts
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

        // Set up base query
        params.q = filters.query || "news";

        // Handle dates
        if (filters.fromDate) {
          params.from = filters.fromDate; // Format must be YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS
        }

        // Handle authors
        if (filters.author) {
          params.q += ` AND author:${filters.author}`; // Add author filter to main query
        }

        // Handle categories
        if (filters.category && filters.category !== CategoryEnum.ALL) {
          params.q += ` AND ${filters.category}`; // Add category filter to main query
        }

        break;

      case "guardian":
        endpoint = "/search";
        params["api-key"] = apiKey;
        params.pageSize = PAGE_SIZE;

        // Handle date filtering
        if (filters.fromDate) {
          params["from-date"] = filters.fromDate; // Changed from 'fromDate' to 'from-date'
          // Guardian API expects date in YYYY-MM-DD format
          if (!/^\d{4}-\d{2}-\d{2}$/.test(filters.fromDate)) {
            throw new Error("Guardian API date must be in YYYY-MM-DD format");
          }
        }

        // Handle category filtering
        if (
          filters.category &&
          filters.category !== CategoryEnum.ALL &&
          !filters.author
        ) {
          params.section = filters.category;
        }
        break;

      case "newyorktimes":
        endpoint = "/search/v2/articlesearch.json";
        params["api-key"] = apiKey;
        params.fq = "";

        if (filters.query) {
          params.fq += `news_desk:("${filters.query}")`;
          params.q = filters.query;
        }

        if (filters.author) {
          params.fq += params.fq
            ? ` AND byline:("${filters.author}")`
            : `byline:("${filters.author}")`;
        }

        if (filters.category && filters.category !== CategoryEnum.ALL) {
          params.fq += params.fq
            ? ` AND section_name:(${filters.category})`
            : `section_name:(${filters.category})`;
        }

        // Add pagination
        params.page = (filters.page || 1) - 1;

        if (filters.fromDate) {
          params.begin_date = filters.fromDate;
        }
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
