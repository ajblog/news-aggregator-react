import { PaginationProps } from "./Pagination.types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, setPage, totalPages }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white bg-blue-600 dark:bg-blue-500 rounded-full shadow-md transition-all duration-300 hover:bg-blue-700 dark:hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        Prev
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        key={page} // Animate every time page changes
        className="px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-lg font-semibold bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md"
      >
        {page} / {totalPages}
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white bg-blue-600 dark:bg-blue-500 rounded-full shadow-md transition-all duration-300 hover:bg-blue-700 dark:hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
    </div>
  );
}
