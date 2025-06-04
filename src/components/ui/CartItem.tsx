import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center py-4 border-b border-gray-100 animate-fade-in">
      {/* Item image */}
      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
      
      {/* Item details */}
      <div className="ml-4 flex-1">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <p className="text-gray-600 text-sm">₹{item.price.toFixed(2)}</p>
      </div>
      
      {/* Quantity controls */}
      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="text-gray-500 hover:text-primary-600 p-1"
          aria-label="Decrease quantity"
        >
          {item.quantity === 1 ? (
            <Trash2 size={18} className="text-error-500" />
          ) : (
            <Minus size={18} />
          )}
        </button>
        
        <span className="w-8 text-center font-medium">
          {item.quantity}
        </span>
        
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="text-gray-500 hover:text-primary-600 p-1"
          aria-label="Increase quantity"
        >
          <Plus size={18} />
        </button>
      </div>
      
      {/* Item total */}
      <div className="ml-4 font-medium text-gray-900 w-20 text-right">
        ₹{(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;