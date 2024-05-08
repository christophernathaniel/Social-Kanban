import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void; // Modify login function to accept token argument
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for stored authentication token or session
    const token = localStorage.getItem('token'); // You can also use sessionStorage
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string) => {
    setIsLoggedIn(true);
    // Store authentication token or session
    localStorage.setItem('token', token); // Set the provided token
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Remove authentication token or session
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };