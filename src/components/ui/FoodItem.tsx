import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export interface FoodItemType {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isVeg: boolean;
  isSpicy?: boolean;
  isBestseller?: boolean;
}

interface FoodItemProps {
  item: FoodItemType;
}

const FoodItem: React.FC<FoodItemProps> = ({ item }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: item.id,
      restaurantId: item.restaurantId,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-100 group hover:bg-gray-50 transition-colors rounded-lg">
      {/* Left side - Content */}
      <div className="flex-1 pr-4">
        <div className="flex items-center space-x-2">
          {/* Veg/Non-veg indicator */}
          <div 
            className={`w-4 h-4 border flex-shrink-0 ${
              item.isVeg ? 'border-accent-500' : 'border-primary-600'
            }`}
          >
            <div 
              className={`w-2 h-2 m-0.5 rounded-full ${
                item.isVeg ? 'bg-accent-500' : 'bg-primary-600'
              }`}
            />
          </div>
          
          {/* Badges */}
          <div className="flex space-x-2">
            {item.isBestseller && (
              <span className="text-xs font-medium text-secondary-500">Bestseller</span>
            )}
            {item.isSpicy && (
              <span className="text-xs font-medium text-primary-600">Spicy</span>
            )}
          </div>
        </div>
        
        <h3 className="font-medium text-gray-900 mt-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mt-1">₹{item.price.toFixed(2)}</p>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description}</p>
      </div>

      {/* Right side - Image and Add button */}
      <div className="relative min-w-[100px] h-[100px]">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-[100px] h-[100px] object-cover rounded-lg"
          />
        ) : (
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg"></div>
        )}
        
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 bg-white text-primary-600 rounded-full p-1 shadow-md border border-gray-200 hover:bg-primary-600 hover:text-white transition-colors group-hover:opacity-100 opacity-90"
          aria-label={`Add ${item.name} to cart`}
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default FoodItem;