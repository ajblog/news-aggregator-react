import { Skeleton } from "../../../../components";
import { NewsListProps } from "./NewsList.types";
import { motion } from "framer-motion";

export default function NewsList({ articles, loading }: NewsListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {loading ? (
        <Skeleton />
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {articles?.map((article, index) => (
            <a
              href={article.url || article.webUrl || article.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              key={index}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-md bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {article.title || article.webTitle || article.headline?.main}
                </h3>
                <p className="text-sm sm:text-md text-gray-600 dark:text-gray-400 mt-2">
                  {article.description || article.abstract || "Read more..."}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </motion.div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
