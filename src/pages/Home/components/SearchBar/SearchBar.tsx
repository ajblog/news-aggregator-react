// SearchBar.tsx
import {
  AnimateWrapper,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useAuth,
  useSearch,
} from "../../../../components";
import { CARD_BACKGROUND_CLASS } from "../../../../constants";
import {
  ArticlesSourcesEnum,
  ArticlesSourceString,
  CategoryType,
  getAllCategories,
} from "../../../../types";
import { Search } from "lucide-react";

export default function SearchBar() {
  const categories = getAllCategories();
  const { state, dispatch } = useSearch();
  const { currentUser } = useAuth();

  return (
    <AnimateWrapper>
      <div className={CARD_BACKGROUND_CLASS}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 sm:mb-6 tracking-tight">
          Stay Updated with the Latest News
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Search Input */}
          <div className="space-y-2">
            <label
              htmlFor="search"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Search
            </label>
            <div className="relative w-full">
              <Input
                id="search"
                type="text"
                value={state.query}
                onChange={(e) =>
                  dispatch({ type: "SET_QUERY", payload: e.target.value })
                }
                placeholder="Search for news..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 "
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-900 w-4 sm:w-5 h-4 sm:h-5"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Category
            </label>
            <Select
              disabled={state.usePreferences}
              value={state.category}
              onValueChange={(value: CategoryType) =>
                dispatch({ type: "SET_CATEGORY", payload: value })
              }
            >
              <SelectTrigger
                id="category"
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-500 text-gray-900 dark:text-white rounded-lg sm:rounded-xl shadow-md hover:ring-2 hover:ring-blue-300 dark:hover:ring-indigo-500 transition-all"
              >
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                {categories.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author Input */}
          <div className="space-y-2">
            <label
              htmlFor="author"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Author
            </label>
            <div className="relative w-full">
              <Input
                disabled={state.source === "guardian" || state.usePreferences}
                id="author"
                type="text"
                value={state.author}
                onChange={(e) =>
                  dispatch({ type: "SET_AUTHOR", payload: e.target.value })
                }
                placeholder={
                  state.source === "guardian"
                    ? "Search by author isn't availble"
                    : "Search by author..."
                }
                className="w-full pl-10 pr-4 py-2 sm:py-3 "
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-900 w-4 sm:w-5 h-4 sm:h-5"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              From Date
            </label>
            <div className="relative w-full">
              <Input
                id="date"
                type="date"
                value={state.fromDate}
                onChange={(e) =>
                  dispatch({ type: "SET_FROM_DATE", payload: e.target.value })
                }
                className="block w-full pr-4 py-2 sm:py-3 "
              />
            </div>
          </div>

          {/* Source Dropdown */}
          <div className="space-y-2">
            <label
              htmlFor="source"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Source
            </label>
            <Select
              value={state.source}
              onValueChange={(value: ArticlesSourceString) =>
                dispatch({ type: "SET_SOURCE", payload: value })
              }
            >
              <SelectTrigger
                id="source"
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-500 text-gray-900 dark:text-white rounded-lg sm:rounded-xl shadow-md hover:ring-2 hover:ring-blue-300 dark:hover:ring-indigo-500 transition-all"
              >
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                <SelectItem value={ArticlesSourcesEnum.NEWYORKTIMES}>
                  NY Times
                </SelectItem>
                <SelectItem value={ArticlesSourcesEnum.GUARDIAN}>
                  The Guardian
                </SelectItem>
                <SelectItem value={ArticlesSourcesEnum.NEWSAPI}>
                  NewsAPI
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="use-preferences"
              type="checkbox"
              disabled={!currentUser}
              checked={state.usePreferences}
              onChange={() =>
                dispatch({
                  type: "SET_USE_PREFERENCES",
                  payload: !state.usePreferences,
                })
              }
              className="w-4 h-4"
            />
            <label
              htmlFor="use-preferences"
              className="text-sm font-medium leading-none"
            >
              {`Use My Preferences ${
                !currentUser && "(You have to sign in to use this feature)"
              }`}
            </label>
          </div>
          <div className="w-full">
            <Button
              onClick={() => dispatch({ type: "RESET_ALL" })}
              className="w-full"
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </AnimateWrapper>
  );
}
