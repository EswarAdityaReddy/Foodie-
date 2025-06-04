import React, { createContext, useState, useContext } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string[];
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just set a mock user
    setUser({
      id: '1',
      name: 'John Doe',
      email,
      phone: '555-1234',
      address: ['123 Main St, Anytown, USA'],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (name: string, email: string, password: string) => {
    // In a real app, this would make an API call
    setUser({
      id: '1',
      name,
      email,
      address: [],
    });
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      return { ...currentUser, ...updates };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};