import { useEffect, useState } from "react";
import { useArticles } from "../../hooks";
import { Layout, Pagination } from "../../components";
import SearchBar from "./components/SearchBar/SearchBar";
import NewsList from "./components/NewsList/NewsList";
import { ArticlesSourceString } from "../../types";

export function Home() {
  const [source, setSource] = useState<ArticlesSourceString>("newsapi");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading } = useArticles(source, {
    query,
    page: page,
    pageSize: 10,
  });

  useEffect(() => {
    setPage(1);
  }, [source]);

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
      <NewsList articles={data?.articles!} />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages || 1}
      />
    </Layout>
  );
}
