import { toast } from 'sonner';

// Types
export interface MockResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  message?: string;
}

interface MockFetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
  headers?: Record<string, string>;
}

// Mock database initialization function
export const initializeMockDatabase = () => {
  // Check if already initialized with sample data
  if (localStorage.getItem('jobvault_mock_db_initialized')) {
    return;
  }
  
  // Create mock database structure with sample data
  const db = {
    users: [
      {
        id: 'user_admin_1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // In real app, this would be hashed
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: 'user_student_1',
        name: 'Student User',
        email: 'student@example.com',
        password: 'password123', // In real app, this would be hashed
        role: 'student',
        createdAt: new Date().toISOString()
      }
    ],
    jobs: [
      {
        id: 'job_1',
        title: 'Software Engineer Intern',
        company: 'Google',
        location: 'Mountain View, CA',
        description: 'Work on cutting-edge projects as a software engineering intern at Google.',
        requirements: 'Strong programming skills in Java, Python, or C++. Knowledge of data structures and algorithms.',
        salary: '$8,000/month',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        createdAt: new Date().toISOString(),
        createdBy: 'user_admin_1'
      },
      {
        id: 'job_2',
        title: 'Frontend Developer',
        company: 'Facebook',
        location: 'Menlo Park, CA',
        description: 'Build user interfaces for Facebook products.',
        requirements: 'Experience with React, JavaScript, and CSS.',
        salary: '$120,000/year',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        createdAt: new Date().toISOString(),
        createdBy: 'user_admin_1'
      }
    ],
    applications: [],
    events: [
      {
        id: 'event_1',
        title: 'Google Info Session',
        description: 'Learn about opportunities at Google',
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 2 hours after start
        location: 'Main Campus Auditorium',
        company: 'Google',
        eventType: 'info_session',
        createdBy: 'user_admin_1'
      },
      {
        id: 'event_2',
        title: 'Resume Workshop',
        description: 'Learn how to build an effective resume',
        startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(), // 3 hours after start
        location: 'Online (Zoom)',
        eventType: 'workshop',
        createdBy: 'user_admin_1'
      },
      {
        id: 'event_3',
        title: 'Facebook Coding Challenge',
        description: 'Online coding assessment for Facebook internships',
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 2 hours after start
        location: 'Online',
        company: 'Facebook',
        eventType: 'test',
        createdBy: 'user_admin_1'
      }
    ],
    notifications: []
  };
  
  // Save mock database and set initialization flag
  localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
  localStorage.setItem('jobvault_mock_db_initialized', 'true');
};

// Mock JWT generation (not real JWT, just for simulation)
const generateMockToken = (userId: string, role: string): string => {
  const mockPayload = { userId, role, exp: Date.now() + 24 * 60 * 60 * 1000 };
  return btoa(JSON.stringify(mockPayload)); // Base64 encode for simulation
};

// Helper to verify mock token
export const verifyMockToken = (token: string): { userId: string; role: string } | null => {
  try {
    const decoded = JSON.parse(atob(token));
    if (decoded.exp < Date.now()) {
      return null; // Token expired
    }
    return { userId: decoded.userId, role: decoded.role };
  } catch (e) {
    return null;
  }
};

// Mock API delay
const mockApiDelay = async () => {
  return new Promise<void>(resolve => setTimeout(resolve, Math.random() * 300 + 100));
};

// Main mock fetch function
export const mockFetch = async <T = any>(
  url: string, 
  options: MockFetchOptions = { method: 'GET' }
): Promise<MockResponse<T>> => {
  try {
    // Initialize mock database if it doesn't exist
    initializeMockDatabase();
    
    // Simulate network delay
    await mockApiDelay();
    
    // Get authentication token if it exists
    const token = localStorage.getItem('jobvault_auth_token');
    const isAuthenticated = token && verifyMockToken(token);
    
    // Parse mock database
    const db = JSON.parse(localStorage.getItem('jobvault_mock_db') || '{}');
    
    // Routes that don't require authentication
    if (url === '/api/auth/login' && options.method === 'POST') {
      const { email, password, role } = JSON.parse(options.body || '{}');
      
      // Find user with matching email and role
      const user = db.users.find((u: any) => 
        u.email.toLowerCase() === email.toLowerCase() && u.role === role
      );
      
      if (!user) {
        return { ok: false, status: 401, message: 'Invalid email or password' };
      }
      
      // In a real app, we would verify hashed password here
      // This is simplified for mock purposes
      if (user.password !== password) {
        return { ok: false, status: 401, message: 'Invalid email or password' };
      }
      
      // Generate mock token
      const token = generateMockToken(user.id, user.role);
      
      // Create sanitized user object (without password)
      const sanitizedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      
      // Store token in localStorage
      localStorage.setItem('jobvault_auth_token', token);
      localStorage.setItem('jobvault_user', JSON.stringify(sanitizedUser));
      
      return { 
        ok: true, 
        status: 200, 
        data: { ...sanitizedUser, token } as T 
      };
    }
    
    if (url === '/api/auth/register' && options.method === 'POST') {
      const userData = JSON.parse(options.body || '{}');
      
      // Check if email already exists
      if (db.users.some((u: any) => u.email.toLowerCase() === userData.email.toLowerCase())) {
        return { ok: false, status: 409, message: 'Email already exists' };
      }
      
      // Create new user with unique ID
      const newUser = {
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        password: userData.password, // In a real app, this would be hashed
        role: userData.role,
        createdAt: new Date().toISOString()
      };
      
      // Add to mock database
      db.users.push(newUser);
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      // Generate mock token
      const token = generateMockToken(newUser.id, newUser.role);
      
      // Create sanitized user object (without password)
      const sanitizedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };
      
      // Store token in localStorage
      localStorage.setItem('jobvault_auth_token', token);
      localStorage.setItem('jobvault_user', JSON.stringify(sanitizedUser));
      
      return { 
        ok: true, 
        status: 201, 
        data: { ...sanitizedUser, token } as T 
      };
    }
    
    if (url === '/api/auth/logout' && options.method === 'POST') {
      localStorage.removeItem('jobvault_auth_token');
      localStorage.removeItem('jobvault_user');
      
      return { ok: true, status: 200 };
    }
    
    if (url === '/api/auth/me' && options.method === 'GET') {
      // Check if user is authenticated
      if (!isAuthenticated) {
        return { ok: false, status: 401, message: 'Unauthorized' };
      }
      
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem('jobvault_user') || 'null');
      
      if (!user) {
        return { ok: false, status: 404, message: 'User not found' };
      }
      
      return { ok: true, status: 200, data: user as T };
    }
    
    // Routes that require authentication
    if (!isAuthenticated) {
      return { ok: false, status: 401, message: 'Unauthorized' };
    }
    
    // Implement other API routes here...
    
    // Default response for unhandled routes
    return { 
      ok: false, 
      status: 404, 
      message: `API endpoint not found: ${url}` 
    };
  } catch (error) {
    console.error('Mock API error:', error);
    toast.error('An unexpected error occurred');
    return { 
      ok: false, 
      status: 500, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
