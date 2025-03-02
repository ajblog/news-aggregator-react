import { useEffect, useState } from "react";
import { useArticles } from "../../hooks";
import { Layout, Pagination } from "../../components";
import SearchBar from "./components/SearchBar/SearchBar";
import NewsList from "./components/NewsList/NewsList";
import { ArticlesSourceString } from "../../types";
import { useDebounce } from "../../hooks/useDebounce";

export function Home() {
  const [source, setSource] = useState<ArticlesSourceString>("newsapi");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<number>(1);

  const debouncedQuery = useDebounce(query, 500);

  const { data, error, isLoading } = useArticles(source, {
    query: debouncedQuery,
    page,
    pageSize: 10,
  });

  useEffect(() => {
    setPage(1);
  }, [source]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-2 md:p-4 xl:p-6">
        <div className="my-6">
          <SearchBar
            query={query}
            setQuery={setQuery}
            source={source}
            setSource={setSource}
          />
        </div>

        {error && (
          <p className="text-center text-red-500 dark:text-red-400">
            Error fetching articles.
          </p>
        )}
        <NewsList loading={isLoading} articles={data?.articles!} />
        {!isLoading && !data?.articles.length && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            No articles found.
          </p>
        )}

        {data?.totalPages ? (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data.totalPages}
          />
        ) : null}
      </div>
    </Layout>
  );
}
