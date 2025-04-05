
import { toast } from 'sonner';

export interface JobPosting {
  id: string;
  company: string;
  position: string;
  description: string;
  requirements: string[];
  location: string;
  salary?: string;
  applicationDeadline: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  eventType: 'interview' | 'test' | 'deadline' | 'presentation' | 'other';
  startDate: string;
  endDate: string;
  company?: string;
  location?: string;
  createdBy: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'job' | 'event' | 'application' | 'system';
  read: boolean;
  createdAt: string;
  relatedId?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt: string;
  resume?: string;
  coverLetter?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  rollNumber?: string;
  department?: string;
  cgpa?: number;
  skills: string[];
  batch?: string;
  linkedIn?: string;
  github?: string;
  phone?: string;
  resume?: string;
}

// Helper function to get data from localStorage
const getStoredData = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(`jobvault_${key}`);
  return data ? JSON.parse(data) : defaultValue;
};

// Helper function to store data in localStorage
const storeData = <T>(key: string, data: T): void => {
  localStorage.setItem(`jobvault_${key}`, JSON.stringify(data));
};

// Job Posting Service
export const JobService = {
  getAll: async (): Promise<JobPosting[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return getStoredData<JobPosting[]>('jobs', []);
  },
  
  getById: async (id: string): Promise<JobPosting | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const jobs = getStoredData<JobPosting[]>('jobs', []);
    return jobs.find(job => job.id === id) || null;
  },
  
  create: async (jobData: Omit<JobPosting, 'id' | 'createdAt'>): Promise<JobPosting> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const jobs = getStoredData<JobPosting[]>('jobs', []);
    
    const newJob: JobPosting = {
      ...jobData,
      id: `job_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    jobs.push(newJob);
    storeData('jobs', jobs);
    
    // Create notification for all students
    NotificationService.createForAllStudents({
      title: 'New Job Posted',
      message: `${newJob.company} is hiring for ${newJob.position}`,
      type: 'job',
      relatedId: newJob.id
    });
    
    return newJob;
  },
  
  update: async (id: string, jobData: Partial<JobPosting>): Promise<JobPosting | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const jobs = getStoredData<JobPosting[]>('jobs', []);
    
    const index = jobs.findIndex(job => job.id === id);
    if (index === -1) return null;
    
    const updatedJob = { ...jobs[index], ...jobData };
    jobs[index] = updatedJob;
    storeData('jobs', jobs);
    
    return updatedJob;
  },
  
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const jobs = getStoredData<JobPosting[]>('jobs', []);
    
    const filteredJobs = jobs.filter(job => job.id !== id);
    storeData('jobs', filteredJobs);
    
    return true;
  },
  
  apply: async (userId: string, jobId: string, applicationData: { resume?: string, coverLetter?: string }): Promise<JobApplication> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create application
    const applications = getStoredData<JobApplication[]>('applications', []);
    
    const newApplication: JobApplication = {
      id: `app_${Date.now()}`,
      userId,
      jobId,
      status: 'pending',
      appliedAt: new Date().toISOString(),
      ...applicationData
    };
    
    applications.push(newApplication);
    storeData('applications', applications);
    
    // Create notification for admin
    NotificationService.create({
      title: 'New Job Application',
      message: `A new application has been submitted for a job posting`,
      type: 'application',
      relatedId: newApplication.id,
      userId: 'admin' // Send to admin
    });
    
    return newApplication;
  },
  
  getApplicationsByUser: async (userId: string): Promise<JobApplication[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const applications = getStoredData<JobApplication[]>('applications', []);
    return applications.filter(app => app.userId === userId);
  },
  
  getApplicationsByJob: async (jobId: string): Promise<JobApplication[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const applications = getStoredData<JobApplication[]>('applications', []);
    return applications.filter(app => app.jobId === jobId);
  },
  
  updateApplicationStatus: async (applicationId: string, status: JobApplication['status']): Promise<JobApplication | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const applications = getStoredData<JobApplication[]>('applications', []);
    
    const index = applications.findIndex(app => app.id === applicationId);
    if (index === -1) return null;
    
    applications[index].status = status;
    storeData('applications', applications);
    
    // Create notification for the student
    NotificationService.create({
      title: 'Application Status Updated',
      message: `Your application status has been updated to: ${status}`,
      type: 'application',
      relatedId: applicationId,
      userId: applications[index].userId
    });
    
    return applications[index];
  }
};

// Calendar Event Service
export const CalendarService = {
  getAll: async (): Promise<CalendarEvent[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return getStoredData<CalendarEvent[]>('events', []);
  },
  
  getById: async (id: string): Promise<CalendarEvent | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const events = getStoredData<CalendarEvent[]>('events', []);
    return events.find(event => event.id === id) || null;
  },
  
  create: async (eventData: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const events = getStoredData<CalendarEvent[]>('events', []);
    
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `event_${Date.now()}`
    };
    
    events.push(newEvent);
    storeData('events', events);
    
    // Create notification for all students
    NotificationService.createForAllStudents({
      title: 'New Event Added',
      message: `${newEvent.title} has been scheduled`,
      type: 'event',
      relatedId: newEvent.id
    });
    
    return newEvent;
  },
  
  update: async (id: string, eventData: Partial<CalendarEvent>): Promise<CalendarEvent | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const events = getStoredData<CalendarEvent[]>('events', []);
    
    const index = events.findIndex(event => event.id === id);
    if (index === -1) return null;
    
    const updatedEvent = { ...events[index], ...eventData };
    events[index] = updatedEvent;
    storeData('events', events);
    
    return updatedEvent;
  },
  
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const events = getStoredData<CalendarEvent[]>('events', []);
    
    const filteredEvents = events.filter(event => event.id !== id);
    storeData('events', filteredEvents);
    
    return true;
  }
};

// Notification Service
export const NotificationService = {
  getByUser: async (userId: string): Promise<Notification[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const notifications = getStoredData<Array<Notification & { userId: string }>>('notifications', []);
    return notifications
      .filter(notification => notification.userId === userId)
      .map(({ userId, ...notification }) => notification)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  
  create: async (notificationData: { 
    title: string;
    message: string;
    type: Notification['type'];
    userId: string;
    relatedId?: string;
  }): Promise<Notification> => {
    const { userId, ...data } = notificationData;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const notifications = getStoredData<Array<Notification & { userId: string }>>('notifications', []);
    
    const newNotification: Notification & { userId: string } = {
      ...data,
      id: `notif_${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
      userId
    };
    
    notifications.push(newNotification);
    storeData('notifications', notifications);
    
    // In a real app, we would trigger a push notification here
    toast.info(`New notification: ${newNotification.title}`);
    
    // Return without the userId field
    const { userId: _, ...result } = newNotification;
    return result;
  },
  
  createForAllStudents: async (notificationData: { 
    title: string;
    message: string;
    type: Notification['type'];
    relatedId?: string;
  }): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get all student users
    const users = getStoredData<any[]>('users', [])
      .filter(user => user.role === 'student');
    
    // Create a notification for each student
    for (const user of users) {
      await NotificationService.create({
        ...notificationData,
        userId: user.id
      });
    }
  },
  
  markAsRead: async (userId: string, notificationId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const notifications = getStoredData<Array<Notification & { userId: string }>>('notifications', []);
    
    const index = notifications.findIndex(
      notification => notification.id === notificationId && notification.userId === userId
    );
    
    if (index === -1) return false;
    
    notifications[index].read = true;
    storeData('notifications', notifications);
    
    return true;
  },
  
  markAllAsRead: async (userId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const notifications = getStoredData<Array<Notification & { userId: string }>>('notifications', []);
    
    const updated = notifications.map(notification => {
      if (notification.userId === userId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    storeData('notifications', updated);
    return true;
  }
};

// Student Profile Service
export const ProfileService = {
  getByUserId: async (userId: string): Promise<StudentProfile | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const profiles = getStoredData<StudentProfile[]>('profiles', []);
    return profiles.find(profile => profile.userId === userId) || null;
  },
  
  create: async (profileData: Omit<StudentProfile, 'id'>): Promise<StudentProfile> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const profiles = getStoredData<StudentProfile[]>('profiles', []);
    
    // Check if profile already exists
    const existingIndex = profiles.findIndex(profile => profile.userId === profileData.userId);
    
    const newProfile: StudentProfile = {
      ...profileData,
      id: `profile_${Date.now()}`
    };
    
    if (existingIndex >= 0) {
      // Update existing profile
      profiles[existingIndex] = { ...profiles[existingIndex], ...newProfile };
    } else {
      // Create new profile
      profiles.push(newProfile);
    }
    
    storeData('profiles', profiles);
    return newProfile;
  },
  
  update: async (userId: string, profileData: Partial<StudentProfile>): Promise<StudentProfile | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const profiles = getStoredData<StudentProfile[]>('profiles', []);
    
    const index = profiles.findIndex(profile => profile.userId === userId);
    if (index === -1) return null;
    
    const updatedProfile = { ...profiles[index], ...profileData };
    profiles[index] = updatedProfile;
    storeData('profiles', profiles);
    
    return updatedProfile;
  },
  
  getAllProfiles: async (): Promise<StudentProfile[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return getStoredData<StudentProfile[]>('profiles', []);
  }
};

// Initialize sample data if not exists
export const initializeSampleData = () => {
  // Check if we already have data
  if (localStorage.getItem('jobvault_initialized') === 'true') {
    return;
  }
  
  // Create admin user if not exists
  const users = getStoredData<any[]>('users', []);
  if (!users.some(user => user.email === 'admin@jobvault.com')) {
    users.push({
      id: 'admin_default',
      name: 'Admin User',
      email: 'admin@jobvault.com',
      password: 'admin123', // In a real app, this would be hashed
      role: 'admin'
    });
    storeData('users', users);
  }
  
  // Create a demo student user if not exists
  if (!users.some(user => user.email === 'student@example.com')) {
    users.push({
      id: 'student_demo',
      name: 'Demo Student',
      email: 'student@example.com',
      password: 'student123', // In a real app, this would be hashed
      role: 'student'
    });
    storeData('users', users);
    
    // Create a profile for the demo student
    const profiles = getStoredData<StudentProfile[]>('profiles', []);
    profiles.push({
      id: 'profile_demo',
      userId: 'student_demo',
      rollNumber: 'CS2023001',
      department: 'Computer Science',
      cgpa: 8.5,
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      batch: '2023',
      linkedIn: 'https://linkedin.com/in/demostudent',
      github: 'https://github.com/demostudent',
      phone: '9876543210',
      resume: ''
    });
    storeData('profiles', profiles);
  }
  
  // Create sample job postings
  const jobs = getStoredData<JobPosting[]>('jobs', []);
  if (jobs.length === 0) {
    const sampleJobs: JobPosting[] = [
      {
        id: 'job_1',
        company: 'Microsoft',
        position: 'Software Engineer',
        description: 'Join our team to build next-generation cloud solutions.',
        requirements: ['Computer Science degree', 'JavaScript', 'React', 'Node.js'],
        location: 'Bangalore, India',
        salary: '15-18 LPA',
        applicationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        createdAt: new Date().toISOString()
      },
      {
        id: 'job_2',
        company: 'Amazon',
        position: 'Frontend Developer',
        description: 'Work on our e-commerce platform and improve user experience.',
        requirements: ['HTML/CSS', 'JavaScript', 'React', 'Redux'],
        location: 'Hyderabad, India',
        salary: '12-15 LPA',
        applicationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
      },
      {
        id: 'job_3',
        company: 'Google',
        position: 'Full Stack Developer',
        description: 'Build robust web applications that scale for millions of users.',
        requirements: ['JavaScript', 'TypeScript', 'Angular', 'Node.js', 'MongoDB'],
        location: 'Gurugram, India',
        salary: '18-22 LPA',
        applicationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
      }
    ];
    
    storeData('jobs', sampleJobs);
  }
  
  // Create sample calendar events
  const events = getStoredData<CalendarEvent[]>('events', []);
  if (events.length === 0) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const inTwoDays = new Date();
    inTwoDays.setDate(inTwoDays.getDate() + 2);
    
    const sampleEvents: CalendarEvent[] = [
      {
        id: 'event_1',
        title: 'Amazon Coding Challenge',
        description: 'Online coding assessment for SDE roles',
        eventType: 'test',
        startDate: tomorrow.toISOString(),
        endDate: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours duration
        company: 'Amazon',
        location: 'Online',
        createdBy: 'admin_default'
      },
      {
        id: 'event_2',
        title: 'Microsoft Technical Interview',
        description: 'Round 1 of technical interviews for selected candidates',
        eventType: 'interview',
        startDate: nextWeek.toISOString(),
        endDate: new Date(nextWeek.getTime() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour duration
        company: 'Microsoft',
        location: 'Microsoft Teams',
        createdBy: 'admin_default'
      },
      {
        id: 'event_3',
        title: 'Resume Submission Deadline',
        description: 'Last date to submit updated resumes for the upcoming placement season',
        eventType: 'deadline',
        startDate: inTwoDays.toISOString(),
        endDate: inTwoDays.toISOString(),
        location: 'Placement Portal',
        createdBy: 'admin_default'
      }
    ];
    
    storeData('events', sampleEvents);
  }
  
  // Set flag to indicate data is initialized
  localStorage.setItem('jobvault_initialized', 'true');
};
