import React, { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import RestaurantCard, { Restaurant } from '../components/ui/RestaurantCard';
import CategorySelector, { Category } from '../components/ui/CategorySelector';
import { MOCK_RESTAURANTS, MOCK_CATEGORIES } from '../data/mockData';

const HomePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [location, setLocation] = useState('New York, NY');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In a real app, we would fetch from an API
    setRestaurants(MOCK_RESTAURANTS);
    setFilteredRestaurants(MOCK_RESTAURANTS);
    setCategories(MOCK_CATEGORIES);
  }, []);

  useEffect(() => {
    let results = [...restaurants];
    
    // Filter by category if selected
    if (selectedCategory) {
      results = results.filter(restaurant => 
        restaurant.cuisines.some(cuisine => 
          MOCK_CATEGORIES.find(cat => cat.id === selectedCategory)?.name === cuisine
        )
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(query))
      );
    }
    
    setFilteredRestaurants(results);
  }, [selectedCategory, searchQuery, restaurants]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryId ? null : categoryId
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Food background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover the best food &amp; drinks
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Delicious food from your favorite restaurants delivered to your doorstep
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-2 flex items-center">
              <div className="flex items-center pl-3 text-gray-400">
                <MapPin size={20} />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your delivery location"
                className="flex-1 p-2 text-gray-800 focus:outline-none"
              />
              <button className="btn-primary">
                Find Food
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="pt-8 pb-4 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <CategorySelector 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory 
                ? `Best ${MOCK_CATEGORIES.find(cat => cat.id === selectedCategory)?.name}`
                : 'Restaurants near you'}
            </h2>
            
            <form 
              onSubmit={handleSearch}
              className="relative max-w-xs"
            >
              <input
                type="text"
                placeholder="Search restaurants..."
                className="pl-9 pr-4 py-2 w-full rounded-full border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </form>
          </div>
          
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No restaurants found. Try changing your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Collections</h2>
            <a href="#" className="text-primary-600 flex items-center hover:underline">
              <span>View all</span>
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Collection 1 */}
            <div className="relative rounded-lg overflow-hidden h-64 group">
              <img 
                src="https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Breakfast specials" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Breakfast Specials</h3>
                <p className="text-sm">20 Places</p>
              </div>
            </div>
            
            {/* Collection 2 */}
            <div className="relative rounded-lg overflow-hidden h-64 group">
              <img 
                src="https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Healthy options" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Healthy Options</h3>
                <p className="text-sm">15 Places</p>
              </div>
            </div>
            
            {/* Collection 3 */}
            <div className="relative rounded-lg overflow-hidden h-64 group">
              <img 
                src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Fine dining" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Fine Dining</h3>
                <p className="text-sm">8 Places</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 max-w-lg">
              <h2 className="text-3xl font-bold mb-4">Get the Foodie App</h2>
              <p className="text-gray-300 mb-6">
                Download the app for faster ordering, exclusive deals, and the ability to track your delivery in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="btn bg-white text-gray-900 hover:bg-gray-100">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" 
                    alt="Get it on Google Play" 
                    className="h-8"
                  />
                </a>
                <a href="#" className="btn bg-white text-gray-900 hover:bg-gray-100">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" 
                    alt="Download on the App Store" 
                    className="h-8"
                  />
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://www.pngmart.com/files/15/Apple-iPhone-12-PNG-Clipart.png" 
                alt="App on phone" 
                className="h-80 md:h-96 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;