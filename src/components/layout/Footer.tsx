import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Smartphone, Mail, Clock } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Discover the best food and drinks in your area. 
              Our mission is to connect food lovers with amazing restaurants.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login / Sign Up</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Partner with us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Smartphone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>support@foodie.com</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Monday-Friday: 9am-8pm</p>
                  <p>Saturday-Sunday: 10am-6pm</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for updates on new restaurants and exclusive offers.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Foodie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;