import React from 'react';
import { X, Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h3>

              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{product.rating}</span>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="text-2xl font-bold text-primary-600">
                  ${discountedPrice.toFixed(2)}
                </div>
                {product.discountPercentage > 0 && (
                  <div className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  {product.stock > 0 ? (
                    <span className="text-green-600">
                      {product.stock} in stock
                    </span>
                  ) : (
                    <span className="text-red-600">Out of stock</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};