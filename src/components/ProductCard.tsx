import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
        <button className="absolute top-2 left-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <h3 className="font-medium text-gray-900 mb-2 truncate">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-purple-600">
              ${discountedPrice.toFixed(2)}
            </div>
            {product.discountPercentage > 0 && (
              <div className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>
          
          <button className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          {product.stock > 0 ? (
            <span className="text-green-600">{product.stock} in stock</span>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
};