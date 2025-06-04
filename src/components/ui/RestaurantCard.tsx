import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisines: string[];
  rating: number;
  delivery_time: string;
  price_range: number;
  distance: string;
  promotion?: string;
  isNew?: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  // Create price range string ($, $$, $$$)
  const priceRange = '₹'.repeat(restaurant.price_range);
  
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block">
      <div className="card group h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden h-48">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {restaurant.promotion && (
              <span className="bg-secondary-500 text-white text-xs font-medium px-2 py-1 rounded">
                {restaurant.promotion}
              </span>
            )}
            
            {restaurant.isNew && (
              <span className="bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded">
                New
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary-600 transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center bg-accent-500 text-white text-sm px-1.5 py-0.5 rounded">
              <Star size={14} className="mr-0.5" />
              <span>{restaurant.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">
            {restaurant.cuisines.join(' • ')} • {priceRange}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{restaurant.delivery_time}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;