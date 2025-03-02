import { NewsListProps } from "./NewsList.types";

export default function NewsList({ articles }: NewsListProps) {
  return (
    <ul className="w-full max-w-2xl space-y-4">
      {articles?.map((article, index) => (
        <li
          key={index}
          className="border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800"
        >
          <a
            href={article.url || article.webUrl || article.web_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold hover:underline"
          >
            {article.title || article.webTitle || article.headline?.main}
          </a>
        </li>
      ))}
    </ul>
  );
}
