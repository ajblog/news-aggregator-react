// import React, { useState } from "react";
// import { useArticles } from "./hooks";

// const NewsList = () => {
//   const [source, setSource] = useState<"newsapi" | "guardian" | "newyorktimes">(
//     "newsapi"
//   );
//   const { data, error, isLoading } = useArticles(source, {
//     query: "technology",
//   });

//   return (
//     <div>
//       <h2>News Articles from {source.toUpperCase()}</h2>

//       {/* Source Selection Dropdown */}
//       <select value={source} onChange={(e) => setSource(e.target.value as any)}>
//         <option value="newsapi">NewsAPI</option>
//         <option value="guardian">The Guardian</option>
//         <option value="newyorktimes">New York Times</option>
//       </select>

//       {isLoading && <p>Loading articles...</p>}
//       {error && <p>Error fetching articles.</p>}

//       <ul>
//         {data?.response?.docs // New York Times response format
//           ? data.response.docs.map((article: any, index: number) => (
//               <li key={index}>
//                 <a
//                   href={article.web_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {article.headline.main}
//                 </a>
//               </li>
//             ))
//           : data?.articles // NewsAPI format
//           ? data.articles.map((article: any, index: number) => (
//               <li key={index}>
//                 <a href={article.url} target="_blank" rel="noopener noreferrer">
//                   {article.title}
//                 </a>
//               </li>
//             ))
//           : data?.response?.results // The Guardian format
//           ? data.response.results.map((article: any, index: number) => (
//               <li key={index}>
//                 <a
//                   href={article.webUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {article.webTitle}
//                 </a>
//               </li>
//             ))
//           : null}
//       </ul>
//     </div>
//   );
// };

// export default NewsList;

import { Sun, Moon } from "lucide-react"; // Icons for light/dark mode
import { useTheme } from "./hooks";
import { Input } from "./components/UI/Input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Button } from "./components/UI/Button/Button";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      {/* Theme Toggle */}
      <div className="bg-testcolor p-5">
        If Tailwind is working, this should be bright red!
      </div>
      <div className="absolute top-4 right-4">
        <Button variant="ghost" onClick={toggleTheme} className="p-2">
          {theme === "light" ? (
            <Moon className="w-6 h-6" />
          ) : (
            <Sun className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Search & Source Dropdown */}
      <div className="w-full max-w-xl space-y-4">
        <h1 className="text-3xl font-bold text-center">Find the Latest News</h1>

        <div className="flex space-x-2">
          {/* Search Input */}
          <Input type="text" placeholder="Search news..." className="flex-1" />

          {/* Source Dropdown */}
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newsapi">NewsAPI</SelectItem>
              <SelectItem value="guardian">The Guardian</SelectItem>
              <SelectItem value="newyorktimes">NY Times</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button variant="outline" className="w-full">
          Search
        </Button>
      </div>
    </div>
  );
}
