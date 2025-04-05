
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService, LoginCredentials, RegisterData } from '@/services/api/auth.service';
import { initializeMockDatabase } from '@/services/api/mock-fetch';

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

  // Initialize mock database and check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        // Initialize sample data
        initializeMockDatabase();
        
        // Check for existing user session
        if (authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            // Token exists but user data couldn't be fetched
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    
    try {
      const credentials: LoginCredentials = { email, password, role };
      const userData = await authService.login(credentials);
      
      setUser(userData);
      
      toast.success('Login successful!');
      
      // Redirect based on role
      navigate(role === 'student' ? '/dashboard/student' : '/dashboard/admin');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    
    try {
      const registerData: RegisterData = { name, email, password, role };
      const userData = await authService.register(registerData);
      
      setUser(userData);
      
      toast.success('Registration successful!');
      
      // Redirect based on role
      navigate(role === 'student' ? '/dashboard/student' : '/dashboard/admin');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.info('Logged out successfully');
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
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
