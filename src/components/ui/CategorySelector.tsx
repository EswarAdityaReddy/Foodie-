import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex space-x-4 min-w-max px-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex flex-col items-center space-y-2 transition-colors ${
              selectedCategory === category.id
                ? 'text-primary-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 p-2 ${
                selectedCategory === category.id
                  ? 'border-2 border-primary-600'
                  : ''
              }`}
            >
              <img 
                src={category.icon} 
                alt={category.name} 
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xs font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;