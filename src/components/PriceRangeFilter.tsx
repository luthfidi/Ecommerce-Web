import React from 'react';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Price Range</h3>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Min</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(Number(e.target.value))}
            min={0}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Max</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            min={minPrice}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );
};