import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorState } from './components/ErrorState';
import { SortDropdown } from './components/SortDropdown';
import { ProductQuickView } from './components/ProductQuickView';
import { Product } from './types/product';

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating: High to Low', value: 'rating-desc' },
];

const ITEMS_PER_PAGE = 12;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes
    },
  },
});

function ProductPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Fetch products
  const { data: productsData, isLoading, error } = useQuery<{ products: Product[] }>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/products?limit=100');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  // Process and filter products
  const processProducts = () => {
    if (!productsData?.products) return [];

    let filtered = [...productsData.products]; // Create a copy of the array

    try {
      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      // Apply search filter if search query exists
      if (searchQuery.trim()) {
        const searchTerms = searchQuery.toLowerCase().trim().split(' ');
        filtered = filtered.filter(product => {
          return searchTerms.some(term => 
            product.title.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            product.brand.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
          );
        });
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-desc':
            return b.rating - a.rating;
          default:
            return b.id - a.id;
        }
      });

      return filtered;
    } catch (error) {
      console.error('Error processing products:', error);
      return [];
    }
  };

  const filteredProducts = processProducts();
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  // Get unique categories
  const categories = Array.from(
    new Set(productsData?.products.map(product => product.category) || [])
  ).sort();

  // Event Handlers
  const handleSearch = (value: string) => {
    try {
      setSearchQuery(value);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error in search:', error);
    }
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'all' ? '' : category);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('latest');
    setCurrentPage(1);
  };

  if (error instanceof Error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our amazing collection of products</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6">
          <SearchBar onSearch={handleSearch} />

          <div className="grid gap-6 md:grid-cols-[250px,1fr]">
            {/* Sidebar */}
            <div className="space-y-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {searchQuery && (
                    <span className="font-medium">
                      Search results for "{searchQuery}": {totalProducts} items
                    </span>
                  )}
                  {!searchQuery && (
                    <span>Showing {totalProducts} products</span>
                  )}
                </p>
                <SortDropdown
                  value={sortBy}
                  onChange={handleSortChange}
                  options={sortOptions}
                />
              </div>

              {/* Active Filters */}
              {(searchQuery || selectedCategory) && (
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                      Search: {searchQuery}
                      <button
                        onClick={() => setSearchQuery('')}
                        className="ml-2 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                      Category: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('')}
                        className="ml-2 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Product Grid */}
              {isLoading ? (
                <LoadingSpinner />
              ) : currentProducts.length > 0 ? (
                <div className="space-y-6">
                  <ProductGrid
                    products={currentProducts}
                    onProductClick={handleProductClick}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found matching your criteria</p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 text-purple-600 hover:text-purple-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1;
                      // Show first, last, and pages around current page
                      if (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`min-w-[40px] h-10 rounded-lg border ${
                              currentPage === page
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      // Show ellipsis
                      if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return <span key={page} className="px-2">...</span>;
                      }
                      return null;
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;