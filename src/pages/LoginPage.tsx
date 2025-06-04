import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

type FormMode = 'login' | 'signup';

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<FormMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      login(email, password);
    } else {
      signup(name, email, password);
    }

    // Navigate to home page after authentication
    navigate('/');
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    // Clear form when switching modes
    setPassword('');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Form Header */}
        <div className="p-6 bg-primary-600 text-white">
          <h2 className="text-2xl font-bold">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="mt-1 text-primary-100">
            {mode === 'login' 
              ? 'Sign in to continue to your account' 
              : 'Join Foodie for the best food delivery experience'}
          </p>
        </div>
        
        {/* Form Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Name Field - Only for signup */}
            {mode === 'signup' && (
              <div className="mb-4">
                <label htmlFor="name\" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your email"
              />
            </div>
            
            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Forgot Password Link - Only for login */}
              {mode === 'login' && (
                <div className="mt-1 text-right">
                  <a href="#" className="text-sm text-primary-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative flex items-center mt-8 mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          {/* Social Sign In */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                alt="Google" 
                className="w-5 h-5 mr-2"
              />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" 
                alt="Facebook" 
                className="w-5 h-5 mr-2"
              />
              <span>Facebook</span>
            </button>
          </div>
          
          {/* Toggle Mode Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary-600 hover:underline font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;