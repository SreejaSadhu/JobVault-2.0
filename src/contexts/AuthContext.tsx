
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define user types
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('jobvault_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('jobvault_user');
      }
    }
    setLoading(false);
  }, []);

  // Mock login functionality
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Get users from localStorage (our mock DB)
      const users = JSON.parse(localStorage.getItem('jobvault_users') || '[]');
      
      // Find user with matching email and role
      const foundUser = users.find((u: any) => 
        u.email.toLowerCase() === email.toLowerCase() && u.role === role
      );
      
      if (!foundUser) {
        toast.error('Invalid email or password');
        return false;
      }
      
      // In a real app, we would verify the password hash here
      // This is a simplified version that just checks for equality
      if (foundUser.password !== password) {
        toast.error('Invalid email or password');
        return false;
      }
      
      // Create sanitized user object (without password)
      const authUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      
      // Store in state and localStorage
      setUser(authUser);
      localStorage.setItem('jobvault_user', JSON.stringify(authUser));
      
      toast.success('Login successful!');
      
      // Redirect based on role
      navigate(role === 'student' ? '/dashboard/student' : '/dashboard/admin');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Mock register functionality
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call with proper password hashing
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('jobvault_users') || '[]');
      
      // Check if email already exists
      if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        toast.error('Email already exists');
        return false;
      }
      
      // Create new user with a unique ID
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // In a real app, this would be hashed
        role
      };
      
      // Add to our "database"
      users.push(newUser);
      localStorage.setItem('jobvault_users', JSON.stringify(users));
      
      // Create sanitized user object (without password)
      const authUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };
      
      // Store in state and localStorage
      setUser(authUser);
      localStorage.setItem('jobvault_user', JSON.stringify(authUser));
      
      toast.success('Registration successful!');
      
      // Redirect based on role
      navigate(role === 'student' ? '/dashboard/student' : '/dashboard/admin');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobvault_user');
    toast.info('Logged out successfully');
    navigate('/auth/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
