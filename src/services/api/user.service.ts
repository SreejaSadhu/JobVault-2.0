
import { mockFetch } from './mock-fetch';
import { User } from '@/contexts/AuthContext';

export interface UserProfile extends User {
  phone?: string;
  address?: string;
  bio?: string;
  skills?: string[];
  education?: {
    institution: string;
    degree: string;
    field: string;
    startYear: number;
    endYear?: number;
    current?: boolean;
  }[];
  experience?: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
  }[];
  resumeUrl?: string;
}

class UserService {
  async getProfile(): Promise<UserProfile> {
    const response = await mockFetch('/api/users/profile', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch profile');
    }

    return response.data;
  }

  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    const response = await mockFetch('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to update profile');
    }

    return response.data;
  }

  async uploadResume(file: File): Promise<{ resumeUrl: string }> {
    // In a real implementation, this would upload to a server or cloud storage
    // For our mock, we'll create a fake URL
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a fake URL based on the file name
    const fakeUrl = `/uploads/resumes/${Date.now()}_${file.name}`;
    
    return { resumeUrl: fakeUrl };
  }

  async getAllStudents(): Promise<UserProfile[]> {
    const response = await mockFetch('/api/users/students', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch students');
    }

    return response.data || [];
  }

  async getStudentById(id: string): Promise<UserProfile> {
    const response = await mockFetch(`/api/users/students/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch student');
    }

    return response.data;
  }

  async exportStudentsData(format: 'csv' | 'pdf'): Promise<string> {
    const response = await mockFetch(`/api/users/students/export?format=${format}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to export students data');
    }

    return response.data.downloadUrl;
  }
}

export const userService = new UserService();
