import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartItem from '../components/ui/CartItem';

const CartPage: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(
    user?.address && user.address.length > 0 ? user.address[0] : ''
  );
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Delivery fee and taxes
  const deliveryFee = items.length > 0 ? 40 : 0;
  const taxAmount = totalPrice * 0.05; // 5% tax
  const grandTotal = totalPrice + deliveryFee + taxAmount;
  
  const handleCheckout = () => {
    // In a real app, this would initiate the payment process
    alert('Order placed successfully!');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-12 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full p-6 inline-block mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/" className="btn-primary">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-gray-600 hover:text-primary-600">
          <ArrowLeft size={20} className="mr-2" />
          <span>Continue Shopping</span>
        </Link>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Items ({totalItems})</h2>
            
            <div className="divide-y divide-gray-100">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button 
                onClick={clearCart}
                className="text-error-500 hover:underline text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          {/* Delivery Instructions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Instructions</h2>
            <textarea
              placeholder="Add instructions for delivery (optional)"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
            ></textarea>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Delivery Address */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Delivery Address</h3>
              {isAuthenticated ? (
                user?.address && user.address.length > 0 ? (
                  <div>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:ring-primary-500 focus:border-primary-500"
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                    >
                      {user.address.map((addr, index) => (
                        <option key={index} value={addr}>{addr}</option>
                      ))}
                    </select>
                    <button className="text-primary-600 text-sm hover:underline">
                      + Add New Address
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start border border-warning-500 bg-yellow-50 rounded-md p-3 text-sm">
                    <AlertCircle size={18} className="text-warning-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700">You haven't added any addresses yet.</p>
                      <button className="text-primary-600 mt-1 hover:underline">
                        + Add New Address
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-start border border-warning-500 bg-yellow-50 rounded-md p-3 text-sm">
                  <AlertCircle size={18} className="text-warning-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700">Please log in to continue with your order.</p>
                    <Link to="/login" className="text-primary-600 mt-1 hover:underline">
                      Login / Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mr-2"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mr-2"
                  />
                  <span>UPI</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="mr-2"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={!isAuthenticated || !selectedAddress}
              className="w-full btn-primary py-3"
            >
              Place Order
            </button>
            
            {!isAuthenticated && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                Please log in to complete your order.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;