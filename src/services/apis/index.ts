import axios from "axios";
import { API_BASE_URLS } from "../../constants";

// Define API keys (securely stored in `.env` file)
const API_KEYS: Record<string, string> = {
  newsapi: import.meta.env.VITE_NEWSAPI_KEY,
  opennews: import.meta.env.VITE_OPENNEWS_KEY,
  newscred: import.meta.env.VITE_NEWSCRED_KEY,
  guardian: import.meta.env.VITE_GUARDIAN_KEY,
  newyorktimes: import.meta.env.VITE_NEWYORKTIMES_KEY,
};

// Create an Axios instance
const apiClient = axios.create({
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Reusable function to fetch articles from any source
export const fetchArticles = async (
  source: "newsapi" | "guardian" | "newyorktimes",
  filters: { category?: string; author?: string; query?: string }
) => {
  try {
    const baseUrl = API_BASE_URLS[source];
    const apiKey = API_KEYS[source];

    if (!baseUrl || !apiKey) {
      throw new Error(`Invalid source: ${source}`);
    }

    let endpoint = "";
    let params: Record<string, string> = {};

    // Configure API calls based on the source
    switch (source) {
      case "newsapi":
        endpoint = "/everything";
        params = {
          apiKey, // ✅ NewsAPI uses `apiKey`
          q: filters.query || "",
          category: filters.category || "",
          author: filters.author || "",
        };
        break;

      case "guardian":
        endpoint = "/search";

        params = {
          q: filters.query ? filters.query.replace(/\s+/g, ",") : "", // Format query
          "api-key": apiKey, // The Guardian uses `api-key`
        };

        if (filters.category) {
          params.section = filters.category; // Add section only if it exists
        }

        // Remove undefined values to avoid sending empty parameters
        Object.keys(params).forEach(
          (key) => params[key] === undefined && delete params[key]
        );

        break;

      case "newyorktimes":
        endpoint = "/search/v2/articlesearch.json";
        params = {
          q: filters.query || "",
          fq: filters.category ? `news_desk:("${filters.category}")` : "",
          "api-key": apiKey, // ✅ NYT uses `api-key`
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
