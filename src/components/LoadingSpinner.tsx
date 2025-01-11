export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500">
          Loading...
        </div>
      </div>
    </div>
  );
};