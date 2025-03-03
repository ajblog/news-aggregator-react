import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PreferenceService } from "../../services";
import { CategoryType, getAllCategories } from "../../types";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Command,
  CommandGroup,
  CommandItem,
  Input,
  Label,
  Layout,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useAuth,
  useToast,
} from "../../components";
import { X } from "lucide-react";

const PreferencesPage = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const userId = currentUser?.id!;

  const { data: preferences, isLoading } = useQuery({
    queryKey: ["preferences", userId],
    queryFn: () => PreferenceService.getPreferences(userId),
  });

  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    []
  );
  const [authorInput, setAuthorInput] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    console.log("this is it", preferences?.categories);
    if (preferences) {
      setSelectedAuthors(preferences.authors || []);
      setSelectedCategories(preferences.categories || []);
    }
  }, [preferences]);

  const mutation = useMutation({
    mutationFn: (
      updatedPreferences: Partial<{
        authors: string[];
        categories: CategoryType[];
      }>
    ) => PreferenceService.savePreferences(userId, updatedPreferences),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferences", userId] });
      toast({
        title: "Success",
        description: "Preferences saved successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save preferences.",
        variant: "destructive",
      });
    },
  });

  const handleAddAuthor = () => {
    if (authorInput.trim() && !selectedAuthors.includes(authorInput.trim())) {
      setSelectedAuthors([...selectedAuthors, authorInput.trim()]);
    }
    setAuthorInput("");
  };

  const handleRemoveAuthor = (author: string) => {
    setSelectedAuthors(selectedAuthors.filter((a) => a !== author));
  };

  const handleToggleCategory = (category: CategoryType) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = () => {
    mutation.mutate({
      authors: selectedAuthors,
      categories: selectedCategories,
    });
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Loading preferences...
      </p>
    );

  console.log(selectedCategories);

  return (
    <Layout>
      <Card className="shadow-lg border dark:border-gray-700 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-white">
            Edit Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Authors */}
            <div>
              <Label className="dark:text-gray-300">Favorite Authors</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedAuthors.map((author) => (
                  <Badge
                    key={author}
                    className="flex items-center gap-1 dark:bg-gray-800"
                  >
                    {author}
                    <X
                      className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveAuthor(author)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex items-center mt-2">
                <Input
                  type="text"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddAuthor()}
                  placeholder="Add author..."
                  className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
                <Button onClick={handleAddAuthor} className="ml-2">
                  Add
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <Label className="dark:text-gray-300">Favorite Categories</Label>
              <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-2 w-full text-left dark:bg-gray-800"
                  >
                    {selectedCategories.length > 0
                      ? selectedCategories
                          .map((c) => c.toUpperCase())
                          .join(", ")
                      : "Select categories"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md left-0">
                  <Command>
                    <CommandGroup>
                      {getAllCategories().map(({ value, label }) => (
                        <CommandItem
                          key={value}
                          onSelect={() => handleToggleCategory(value)}
                          className={`cursor-pointer font-bold ${
                            selectedCategories.includes(value)
                              ? "text-blue-500"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <Button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedAuthors([]);
                handleSave();
              }}
              className="w-full mt-8"
              variant="outline"
            >
              Clear!
            </Button>
            <Button
              onClick={handleSave}
              className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export { PreferencesPage };
