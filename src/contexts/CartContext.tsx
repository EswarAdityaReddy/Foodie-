import React, { createContext, useState, useContext } from 'react';

export type CartItem = {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  restaurantId: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    // If this is the first item, set the restaurant ID
    if (items.length === 0) {
      setRestaurantId(newItem.restaurantId);
    }
    
    // Don't allow items from different restaurants
    if (restaurantId && newItem.restaurantId !== restaurantId) {
      if (window.confirm('Your cart contains items from a different restaurant. Would you like to start a new cart?')) {
        setItems([{ ...newItem, quantity: 1 }]);
        setRestaurantId(newItem.restaurantId);
      }
      return;
    }
    
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    // If cart is empty after removing, reset restaurant ID
    if (items.length === 1) {
      setRestaurantId(null);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        restaurantId,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};