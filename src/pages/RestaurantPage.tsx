import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Info, Share2, Heart, Phone, ChevronRight } from 'lucide-react';
import FoodItem, { FoodItemType } from '../components/ui/FoodItem';
import { MOCK_RESTAURANTS, MOCK_MENU_ITEMS } from '../data/mockData';
import { Restaurant } from '../components/ui/RestaurantCard';

// Interface for menu sections
interface MenuSection {
  id: string;
  name: string;
  items: FoodItemType[];
}

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuSections, setMenuSections] = useState<MenuSection[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch from API based on ID
    const foundRestaurant = MOCK_RESTAURANTS.find(r => r.id === id);
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
      
      // Get menu items for this restaurant
      const restaurantMenuItems = MOCK_MENU_ITEMS.filter(
        item => item.restaurantId === id
      );
      
      // Group by category
      const sections: { [key: string]: FoodItemType[] } = {};
      restaurantMenuItems.forEach(item => {
        if (!sections[item.category]) {
          sections[item.category] = [];
        }
        sections[item.category].push(item);
      });
      
      // Convert to array for easier rendering
      const sectionsArray = Object.keys(sections).map(key => ({
        id: key.toLowerCase().replace(/\s+/g, '-'),
        name: key,
        items: sections[key],
      }));
      
      setMenuSections(sectionsArray);
      if (sectionsArray.length > 0) {
        setActiveSection(sectionsArray[0].id);
      }
    }
  }, [id]);

  if (!restaurant) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-gray-600">Loading restaurant information...</p>
      </div>
    );
  }

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Create price range string ($, $$, $$$)
  const priceRange = '₹'.repeat(restaurant.price_range);

  return (
    <div className="animate-fade-in">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        
        <div className="container-custom relative h-full flex items-end pb-6">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-gray-200 mb-3">{restaurant.cuisines.join(' • ')} • {priceRange}</p>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{restaurant.distance}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{restaurant.delivery_time}</span>
              </div>
              <div className="flex items-center bg-accent-500 text-white px-2 py-0.5 rounded">
                <Star size={14} className="mr-1" />
                <span>{restaurant.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="sticky top-16 z-20 bg-white shadow-sm">
        <div className="container-custom py-3">
          <div className="flex overflow-x-auto gap-4">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center min-w-max px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <Heart 
                size={18} 
                className={`mr-2 ${isFavorite ? 'fill-primary-600 text-primary-600' : 'text-gray-600'}`} 
              />
              <span>Save</span>
            </button>
            <button className="flex items-center min-w-max px-3 py-2 rounded-md hover:bg-gray-100">
              <Share2 size={18} className="mr-2 text-gray-600" />
              <span>Share</span>
            </button>
            <button className="flex items-center min-w-max px-3 py-2 rounded-md hover:bg-gray-100">
              <Phone size={18} className="mr-2 text-gray-600" />
              <span>Call</span>
            </button>
            <button className="flex items-center min-w-max px-3 py-2 rounded-md hover:bg-gray-100">
              <Info size={18} className="mr-2 text-gray-600" />
              <span>More info</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu Navigation and Content */}
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Menu Navigation Sidebar - Sticks to top while scrolling */}
          <div className="md:w-1/4">
            <div className="sticky top-32 bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-lg mb-4">Menu</h2>
              <nav>
                <ul className="space-y-1">
                  {menuSections.map(section => (
                    <li key={section.id}>
                      <button
                        onClick={() => handleSectionClick(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between transition-colors ${
                          activeSection === section.id
                            ? 'bg-primary-50 text-primary-600 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{section.name}</span>
                        <ChevronRight size={16} className={activeSection === section.id ? 'text-primary-600' : 'text-gray-400'} />
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Menu Content */}
          <div className="md:w-3/4">
            {menuSections.map(section => (
              <div 
                key={section.id} 
                id={section.id}
                className="mb-8 scroll-mt-32"
              >
                <h2 className="text-xl font-semibold mb-4 px-4">{section.name}</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {section.items.map(item => (
                    <FoodItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;