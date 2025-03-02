export function Skeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
        />
      ))}
    </div>
  );
}
