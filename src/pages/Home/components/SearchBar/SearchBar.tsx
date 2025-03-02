import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components";
import { ArticlesSourceString } from "../../../../types";
import { SearchBarPropTypes } from "./SearchBar.types";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBar({
  query,
  setQuery,
  source,
  setSource,
}: SearchBarPropTypes) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-gray-900 dark:to-gray-800 text-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-gray-300 dark:border-gray-700"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 sm:mb-6 tracking-tight">
        Stay Updated with the Latest News
      </h1>
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news..."
            className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-lg rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-300 dark:focus:ring-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 sm:w-5 h-4 sm:h-5" />
        </div>

        {/* Source Dropdown */}
        <Select
          value={source}
          onValueChange={(value: ArticlesSourceString) => setSource(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px] md:w-[220px] px-4 py-2 sm:py-3 text-sm sm:text-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg sm:rounded-xl shadow-md hover:ring-2 hover:ring-blue-300 dark:hover:ring-indigo-500 transition-all">
            <SelectValue placeholder="Select Source" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
            <SelectItem value="newsapi">NewsAPI</SelectItem>
            <SelectItem value="guardian">The Guardian</SelectItem>
            <SelectItem value="newyorktimes">NY Times</SelectItem>
          </SelectContent>
        </Select>

        {/* Search Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="secondary"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-semibold bg-blue-600 dark:bg-indigo-500 text-white rounded-lg sm:rounded-xl shadow-md transition-all hover:bg-blue-700 dark:hover:bg-indigo-400 hover:shadow-lg"
          >
            Search
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
