import { useEffect } from "react";
import { useArticles } from "../../hooks";
import { Layout, Pagination, useAuth, useSearch } from "../../components";
import SearchBar from "./components/SearchBar/SearchBar";
import NewsList from "./components/NewsList/NewsList";
import { useDebounce } from "../../hooks/useDebounce";
import { useArticlesWithPreferences } from "../../hooks/useArticleWithPreference";

export function Home() {
  const { state: searchState, dispatch } = useSearch();
  const { currentUser } = useAuth();
  // Create debounced filters
  const debouncedFilters = useDebounce(
    {
      query: searchState.query,
      category: searchState.category,
      author: searchState.author,
      fromDate: searchState.fromDate,
      page: searchState.page,
      pageSize: 10,
    },
    500
  );

  const { data, error, isLoading } = searchState.usePreferences
    ? useArticlesWithPreferences(searchState.source, currentUser?.id!)
    : useArticles(searchState.source, debouncedFilters);

  useEffect(() => {
    dispatch({ type: "SET_PAGE", payload: 1 });
  }, [searchState.source]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-2 md:p-4 xl:p-6">
        <SearchBar />

        {error && (
          <p className="text-center text-red-500">Error fetching articles.</p>
        )}

        <NewsList loading={isLoading} articles={data?.articles ?? []} />

        {!isLoading && !data?.articles?.length && (
          <p className="text-center text-gray-500 mt-4">No articles found.</p>
        )}

        {data?.totalPages ? (
          <Pagination
            page={searchState.page}
            setPage={(page) => dispatch({ type: "SET_PAGE", payload: page })}
            totalPages={data.totalPages}
          />
        ) : null}
      </div>
    </Layout>
  );
}
