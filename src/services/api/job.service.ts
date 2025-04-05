
import { mockFetch } from './mock-fetch';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
  deadline: string;
  createdAt: string;
  createdBy: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  studentId: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  appliedAt: string;
  resumeUrl?: string;
  coverLetter?: string;
}

class JobService {
  async getAllJobs(): Promise<Job[]> {
    const response = await mockFetch('/api/jobs', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch jobs');
    }

    return response.data || [];
  }

  async getJobById(id: string): Promise<Job> {
    const response = await mockFetch(`/api/jobs/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch job');
    }

    return response.data;
  }

  async createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'createdBy'>): Promise<Job> {
    const response = await mockFetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to create job');
    }

    return response.data;
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    const response = await mockFetch(`/api/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to update job');
    }

    return response.data;
  }

  async deleteJob(id: string): Promise<void> {
    const response = await mockFetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to delete job');
    }
  }

  // Application methods
  async applyToJob(jobId: string, applicationData: { resumeUrl?: string, coverLetter?: string }): Promise<JobApplication> {
    const response = await mockFetch(`/api/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to apply for job');
    }

    return response.data;
  }

  async getMyApplications(): Promise<JobApplication[]> {
    const response = await mockFetch('/api/applications/me', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch applications');
    }

    return response.data || [];
  }

  async getAllApplications(): Promise<JobApplication[]> {
    const response = await mockFetch('/api/applications', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch applications');
    }

    return response.data || [];
  }

  async updateApplicationStatus(applicationId: string, status: JobApplication['status']): Promise<JobApplication> {
    const response = await mockFetch(`/api/applications/${applicationId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to update application status');
    }

    return response.data;
  }
}

export const jobService = new JobService();
