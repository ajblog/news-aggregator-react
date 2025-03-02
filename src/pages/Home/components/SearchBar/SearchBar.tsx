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

export default function SearchBar({
  query,
  setQuery,
  source,
  setSource,
}: SearchBarPropTypes) {
  return (
    <div className="w-full max-w-xl space-y-4">
      <h1 className="text-3xl font-bold text-center">Find the Latest News</h1>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className="flex-1"
        />
        <Select
          value={source}
          onValueChange={(value: ArticlesSourceString) => setSource(value)}
        >
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
      <Button variant="outline" className="w-full">
        Search
      </Button>
    </div>
  );
}
