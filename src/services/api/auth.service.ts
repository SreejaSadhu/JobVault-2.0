
import { User, UserRole } from '@/contexts/AuthContext';
import { mockFetch } from './mock-fetch';

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await mockFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Invalid email or password');
    }

    return response.data;
  }

  async register(userData: RegisterData): Promise<User> {
    const response = await mockFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Registration failed');
    }

    return response.data;
  }

  async logout(): Promise<void> {
    await mockFetch('/api/auth/logout', {
      method: 'POST',
    });
    
    // Clear local storage
    localStorage.removeItem('jobvault_auth_token');
    localStorage.removeItem('jobvault_user');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await mockFetch('/api/auth/me', {
        method: 'GET',
      });

      if (!response.ok) {
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  storeToken(token: string): void {
    localStorage.setItem('jobvault_auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jobvault_auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
