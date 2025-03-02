import { useState } from "react";
import { useArticles } from "../../hooks";
import { Layout, Pagination } from "../../components";
import SearchBar from "./components/SearchBar/SearchBar";
import NewsList from "./components/NewsList/NewsList";

export function Home() {
  const [source, setSource] = useState<"newsapi" | "guardian" | "newyorktimes">(
    "newsapi"
  );
  const [query, setQuery] = useState("technology");
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useArticles(source, { query });

  return (
    <Layout>
      <SearchBar
        query={query}
        setQuery={setQuery}
        source={source}
        setSource={setSource}
      />
      {isLoading && <p>Loading articles...</p>}
      {error && <p>Error fetching articles.</p>}
      <NewsList
        articles={
          data?.articles || data?.response?.docs || data?.response?.results
        }
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages || 1}
      />
    </Layout>
  );
}
