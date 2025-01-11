import { ShoppingCart, Heart } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">ShopHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Heart className="h-6 w-6 text-gray-500" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-purple-600 rounded-full text-xs text-white flex items-center justify-center">
                0
              </span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="h-6 w-6 text-gray-500" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-purple-600 rounded-full text-xs text-white flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};