import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Clock, CreditCard, Settings, LogOut, Edit, Trash2, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type TabType = 'orders' | 'addresses' | 'payments' | 'settings';

// Mock orders data
const mockOrders = [
  {
    id: 'ord-001',
    date: '2023-05-15',
    restaurant: 'Spice Paradise',
    items: ['Butter Chicken', 'Naan', 'Biryani'],
    total: 850,
    status: 'Delivered',
  },
  {
    id: 'ord-002',
    date: '2023-05-10',
    restaurant: 'Pizza Planet',
    items: ['Pepperoni Pizza', 'Garlic Bread', 'Coke'],
    total: 699,
    status: 'Delivered',
  },
  {
    id: 'ord-003',
    date: '2023-05-05',
    restaurant: 'Burger King',
    items: ['Whopper', 'Fries', 'Milkshake'],
    total: 450,
    status: 'Delivered',
  },
];

const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditing(false);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* User Info */}
            <div className="p-6 border-b border-gray-100">
              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Edit Profile</h3>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={32} className="text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <h2 className="font-semibold text-lg">{user.name}</h2>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                      <p className="text-gray-600 text-sm">{user.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditForm({
                        name: user.name,
                        email: user.email,
                        phone: user.phone || '',
                      });
                      setIsEditing(true);
                    }}
                    className="mt-4 text-primary-600 text-sm hover:underline flex items-center"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
            
            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'orders'
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Clock size={18} className="mr-3" />
                    Order History
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'addresses'
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <MapPin size={18} className="mr-3" />
                    Saved Addresses
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'payments'
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <CreditCard size={18} className="mr-3" />
                    Payment Methods
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                      activeTab === 'settings'
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    Account Settings
                  </button>
                </li>
                <li className="pt-2 border-t border-gray-100 mt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 rounded-md text-left hover:bg-gray-100 text-gray-700"
                  >
                    <LogOut size={18} className="mr-3" />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Order History Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Order History</h2>
                
                {mockOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 mb-4 hover:border-primary-200 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{order.restaurant}</h3>
                        <p className="text-sm text-gray-600">
                          Order #{order.id} • {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-accent-50 text-accent-600 text-xs font-medium rounded-full">
                        {order.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {order.items.join(', ')}
                    </p>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="font-medium">₹{order.total.toFixed(2)}</span>
                      <button className="text-primary-600 text-sm hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Add New Address Card */}
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-primary-300 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-3">
                      <Plus size={20} className="text-primary-600" />
                    </div>
                    <p className="font-medium text-gray-900">Add New Address</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Save a new delivery location
                    </p>
                  </div>
                  
                  {/* Existing Address Card */}
                  {user.address?.map((address, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 relative hover:border-primary-200 transition-colors">
                      <div className="absolute top-3 right-3 flex space-x-1">
                        <button className="p-1 text-gray-400 hover:text-primary-600">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-error-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="mb-2">
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                          Home
                        </span>
                      </div>
                      
                      <p className="text-gray-800 pr-16">{address}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Payment Methods Tab */}
            {activeTab === 'payments' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Add New Card */}
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-primary-300 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-3">
                      <Plus size={20} className="text-primary-600" />
                    </div>
                    <p className="font-medium text-gray-900">Add New Card</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Save a new payment method
                    </p>
                  </div>
                  
                  {/* Sample Card */}
                  <div className="border border-gray-200 rounded-lg p-4 relative hover:border-primary-200 transition-colors">
                    <div className="absolute top-3 right-3 flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-error-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                        alt="Mastercard" 
                        className="h-8 mr-2"
                      />
                      <span className="font-medium">•••• 4589</span>
                    </div>
                    
                    <p className="text-sm text-gray-600">Expires 12/25</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Notifications
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span>Order status updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span>Promotional emails</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span>New restaurant alerts</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language Preference
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <button type="button" className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;