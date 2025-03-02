// types/categories.ts
export enum CategoryEnum {
  ALL = "all",
  TECHNOLOGY = "technology",
  SCIENCE = "science",
  SPORTS = "sports",
  HEALTH = "health",
  BUSINESS = "business",
  ENTERTAINMENT = "entertainment",
}

export type CategoryType = (typeof CategoryEnum)[keyof typeof CategoryEnum];

// Interface for category items with both value and label
export interface CategoryItem {
  value: CategoryType;
  label: string;
}
export const stringToCategory = (value: string): CategoryType | undefined => {
  return (Object.values(CategoryEnum) as CategoryType[]).find(
    (category) => category === value
  );
};

// Enhanced getAllCategories that returns both values and labels
export const getAllCategories = (): CategoryItem[] => {
  return Object.entries(CategoryEnum)
    .filter(([key]) => isNaN(Number(key))) // Filter out numeric keys
    .map(([key, value]) => ({
      value: value as CategoryType,
      label: key.replace(/([a-z])/g, " $1").trim(),
    }));
};
