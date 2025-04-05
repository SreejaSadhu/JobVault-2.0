
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

    // JOB ROUTES
    // Get all jobs
    if (url === '/api/jobs' && options.method === 'GET') {
      return {
        ok: true,
        status: 200,
        data: db.jobs as T
      };
    }

    // Get job by ID
    if (url.match(/^\/api\/jobs\/[^\/]+$/) && options.method === 'GET') {
      const jobId = url.split('/').pop();
      const job = db.jobs.find((j: any) => j.id === jobId);
      
      if (!job) {
        return { ok: false, status: 404, message: 'Job not found' };
      }
      
      return { ok: true, status: 200, data: job as T };
    }

    // Create new job
    if (url === '/api/jobs' && options.method === 'POST') {
      // Only admin can create jobs
      if (isAuthenticated.role !== 'admin') {
        return { ok: false, status: 403, message: 'Forbidden: Only admins can create jobs' };
      }
      
      const jobData = JSON.parse(options.body || '{}');
      const newJob = {
        id: `job_${Date.now()}`,
        ...jobData,
        createdAt: new Date().toISOString(),
        createdBy: isAuthenticated.userId
      };
      
      // Add to database
      db.jobs.push(newJob);
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      // Create notification for all students
      const students = db.users.filter((u: any) => u.role === 'student');
      const newNotifications = students.map((student: any) => ({
        id: `notification_${Date.now()}_${student.id}`,
        userId: student.id,
        title: 'New Job Posted',
        message: `A new job for ${newJob.title} at ${newJob.company} has been posted.`,
        type: 'job',
        read: false,
        createdAt: new Date().toISOString(),
        relatedId: newJob.id
      }));
      
      // Add notifications to database
      db.notifications = [...db.notifications, ...newNotifications];
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 201, data: newJob as T };
    }

    // Update job
    if (url.match(/^\/api\/jobs\/[^\/]+$/) && options.method === 'PUT') {
      // Only admin can update jobs
      if (isAuthenticated.role !== 'admin') {
        return { ok: false, status: 403, message: 'Forbidden: Only admins can update jobs' };
      }
      
      const jobId = url.split('/').pop();
      const jobIndex = db.jobs.findIndex((j: any) => j.id === jobId);
      
      if (jobIndex === -1) {
        return { ok: false, status: 404, message: 'Job not found' };
      }
      
      const jobData = JSON.parse(options.body || '{}');
      const updatedJob = {
        ...db.jobs[jobIndex],
        ...jobData,
        id: jobId, // Ensure ID doesn't change
        createdBy: db.jobs[jobIndex].createdBy, // Ensure creator doesn't change
        createdAt: db.jobs[jobIndex].createdAt // Ensure creation date doesn't change
      };
      
      // Update in database
      db.jobs[jobIndex] = updatedJob;
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 200, data: updatedJob as T };
    }

    // Delete job
    if (url.match(/^\/api\/jobs\/[^\/]+$/) && options.method === 'DELETE') {
      // Only admin can delete jobs
      if (isAuthenticated.role !== 'admin') {
        return { ok: false, status: 403, message: 'Forbidden: Only admins can delete jobs' };
      }
      
      const jobId = url.split('/').pop();
      const jobIndex = db.jobs.findIndex((j: any) => j.id === jobId);
      
      if (jobIndex === -1) {
        return { ok: false, status: 404, message: 'Job not found' };
      }
      
      // Remove from database
      db.jobs.splice(jobIndex, 1);
      
      // Remove related applications
      db.applications = db.applications.filter((a: any) => a.jobId !== jobId);
      
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 200 };
    }

    // JOB APPLICATION ROUTES
    // Apply to job
    if (url.match(/^\/api\/jobs\/[^\/]+\/apply$/) && options.method === 'POST') {
      // Only students can apply to jobs
      if (isAuthenticated.role !== 'student') {
        return { ok: false, status: 403, message: 'Forbidden: Only students can apply to jobs' };
      }
      
      const jobId = url.split('/')[3];
      const job = db.jobs.find((j: any) => j.id === jobId);
      
      if (!job) {
        return { ok: false, status: 404, message: 'Job not found' };
      }
      
      // Check if already applied
      const existingApplication = db.applications.find((a: any) => 
        a.jobId === jobId && a.studentId === isAuthenticated.userId
      );
      
      if (existingApplication) {
        return { ok: false, status: 409, message: 'You have already applied to this job' };
      }
      
      const applicationData = JSON.parse(options.body || '{}');
      const newApplication = {
        id: `application_${Date.now()}`,
        jobId,
        studentId: isAuthenticated.userId,
        status: 'pending',
        appliedAt: new Date().toISOString(),
        ...applicationData
      };
      
      // Add to database
      db.applications.push(newApplication);
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      // Create notification for admin
      const admins = db.users.filter((u: any) => u.role === 'admin');
      const student = db.users.find((u: any) => u.id === isAuthenticated.userId);
      
      const newNotifications = admins.map((admin: any) => ({
        id: `notification_${Date.now()}_${admin.id}`,
        userId: admin.id,
        title: 'New Job Application',
        message: `${student.name} has applied for the ${job.title} position at ${job.company}.`,
        type: 'application',
        read: false,
        createdAt: new Date().toISOString(),
        relatedId: newApplication.id
      }));
      
      // Add notifications to database
      db.notifications = [...db.notifications, ...newNotifications];
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 201, data: newApplication as T };
    }

    // Get student's applications
    if (url === '/api/applications/me' && options.method === 'GET') {
      if (isAuthenticated.role !== 'student') {
        return { ok: false, status: 403, message: 'Forbidden: Only students can view their applications' };
      }
      
      const applications = db.applications.filter((a: any) => a.studentId === isAuthenticated.userId);
      
      return { ok: true, status: 200, data: applications as T };
    }

    // Get all applications (admin only)
    if (url === '/api/applications' && options.method === 'GET') {
      if (isAuthenticated.role !== 'admin') {
        return { ok: false, status: 403, message: 'Forbidden: Only admins can view all applications' };
      }
      
      return { ok: true, status: 200, data: db.applications as T };
    }

    // Update application status (admin only)
    if (url.match(/^\/api\/applications\/[^\/]+\/status$/) && options.method === 'PUT') {
      if (isAuthenticated.role !== 'admin') {
        return { ok: false, status: 403, message: 'Forbidden: Only admins can update application status' };
      }
      
      const applicationId = url.split('/')[3];
      const applicationIndex = db.applications.findIndex((a: any) => a.id === applicationId);
      
      if (applicationIndex === -1) {
        return { ok: false, status: 404, message: 'Application not found' };
      }
      
      const { status } = JSON.parse(options.body || '{}');
      if (!['pending', 'reviewing', 'accepted', 'rejected'].includes(status)) {
        return { ok: false, status: 400, message: 'Invalid status' };
      }
      
      // Update application
      db.applications[applicationIndex].status = status;
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      // Create notification for student
      const application = db.applications[applicationIndex];
      const job = db.jobs.find((j: any) => j.id === application.jobId);
      
      const newNotification = {
        id: `notification_${Date.now()}_${application.studentId}`,
        userId: application.studentId,
        title: 'Application Status Updated',
        message: `Your application for ${job.title} at ${job.company} has been ${status}.`,
        type: 'application',
        read: false,
        createdAt: new Date().toISOString(),
        relatedId: application.id
      };
      
      // Add notification to database
      db.notifications.push(newNotification);
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 200, data: db.applications[applicationIndex] as T };
    }

    // EVENT ROUTES
    // Get all events
    if (url === '/api/events' && options.method === 'GET') {
      return {
        ok: true,
        status: 200,
        data: db.events as T
      };
    }

    // Get event by ID
    if (url.match(/^\/api\/events\/[^\/]+$/) && options.method === 'GET') {
      const eventId = url.split('/').pop();
      const event = db.events.find((e: any) => e.id === eventId);
      
      if (!event) {
        return { ok: false, status: 404, message: 'Event not found' };
      }
      
      return { ok: true, status: 200, data: event as T };
    }

    // Create new event (admin only)
    if (url === '/api/events' && options.method === 'POST') {
      if (isAuthenticated.role !== 'admin') {
        return { ok: false, status: 403, message: 'Forbidden: Only admins can create events' };
      }
      
      const eventData = JSON.parse(options.body || '{}');
      const newEvent = {
        id: `event_${Date.now()}`,
        ...eventData,
        createdBy: isAuthenticated.userId
      };
      
      // Add to database
      db.events.push(newEvent);
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      // Create notification for all students
      const students = db.users.filter((u: any) => u.role === 'student');
      const newNotifications = students.map((student: any) => ({
        id: `notification_${Date.now()}_${student.id}`,
        userId: student.id,
        title: 'New Event Scheduled',
        message: `A new event "${newEvent.title}" has been scheduled on ${new Date(newEvent.startDate).toLocaleDateString()}.`,
        type: 'event',
        read: false,
        createdAt: new Date().toISOString(),
        relatedId: newEvent.id
      }));
      
      // Add notifications to database
      db.notifications = [...db.notifications, ...newNotifications];
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 201, data: newEvent as T };
    }

    // Update event (admin only)
    if (url.match(/^\/api\/events\/[^\/]+$/) && options.method === 'PUT') {
      if (isAuthenticated.role !== 'admin') {
        return { ok: false, status: 403, message: 'Forbidden: Only admins can update events' };
      }
      
      const eventId = url.split('/').pop();
      const eventIndex = db.events.findIndex((e: any) => e.id === eventId);
      
      if (eventIndex === -1) {
        return { ok: false, status: 404, message: 'Event not found' };
      }
      
      const eventData = JSON.parse(options.body || '{}');
      const updatedEvent = {
        ...db.events[eventIndex],
        ...eventData,
        id: eventId, // Ensure ID doesn't change
        createdBy: db.events[eventIndex].createdBy // Ensure creator doesn't change
      };
      
      // Update in database
      db.events[eventIndex] = updatedEvent;
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 200, data: updatedEvent as T };
    }

    // Delete event (admin only)
    if (url.match(/^\/api\/events\/[^\/]+$/) && options.method === 'DELETE') {
      if (isAuthenticated.role !== 'admin') {
        return { ok: false, status: 403, message: 'Forbidden: Only admins can delete events' };
      }
      
      const eventId = url.split('/').pop();
      const eventIndex = db.events.findIndex((e: any) => e.id === eventId);
      
      if (eventIndex === -1) {
        return { ok: false, status: 404, message: 'Event not found' };
      }
      
      // Remove from database
      db.events.splice(eventIndex, 1);
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 200 };
    }

    // NOTIFICATION ROUTES
    // Get user's notifications
    if (url === '/api/notifications' && options.method === 'GET') {
      const notifications = db.notifications.filter((n: any) => n.userId === isAuthenticated.userId);
      
      return { ok: true, status: 200, data: notifications as T };
    }

    // Mark notification as read
    if (url.match(/^\/api\/notifications\/[^\/]+\/read$/) && options.method === 'PUT') {
      const notificationId = url.split('/')[3];
      const notificationIndex = db.notifications.findIndex(
        (n: any) => n.id === notificationId && n.userId === isAuthenticated.userId
      );
      
      if (notificationIndex === -1) {
        return { ok: false, status: 404, message: 'Notification not found' };
      }
      
      // Update notification
      db.notifications[notificationIndex].read = true;
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 200, data: db.notifications[notificationIndex] as T };
    }

    // Mark all notifications as read
    if (url === '/api/notifications/read-all' && options.method === 'PUT') {
      // Update all notifications for the user
      db.notifications.forEach((n: any, i: number) => {
        if (n.userId === isAuthenticated.userId) {
          db.notifications[i].read = true;
        }
      });
      
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 200 };
    }

    // Delete notification
    if (url.match(/^\/api\/notifications\/[^\/]+$/) && options.method === 'DELETE') {
      const notificationId = url.split('/').pop();
      const notificationIndex = db.notifications.findIndex(
        (n: any) => n.id === notificationId && n.userId === isAuthenticated.userId
      );
      
      if (notificationIndex === -1) {
        return { ok: false, status: 404, message: 'Notification not found' };
      }
      
      // Remove from database
      db.notifications.splice(notificationIndex, 1);
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 200 };
    }

    // Send notification (admin only)
    if (url === '/api/notifications/send' && options.method === 'POST') {
      if (isAuthenticated.role !== 'admin') {
        return { ok: false, status: 403, message: 'Forbidden: Only admins can send notifications' };
      }
      
      const { userId, title, message, type, relatedId } = JSON.parse(options.body || '{}');
      
      // Validate user exists
      const user = db.users.find((u: any) => u.id === userId);
      if (!user) {
        return { ok: false, status: 404, message: 'User not found' };
      }
      
      const newNotification = {
        id: `notification_${Date.now()}_${userId}`,
        userId,
        title,
        message,
        type,
        read: false,
        createdAt: new Date().toISOString(),
        relatedId
      };
      
      // Add to database
      db.notifications.push(newNotification);
      localStorage.setItem('jobvault_mock_db', JSON.stringify(db));
      
      return { ok: true, status: 201, data: newNotification as T };
    }
    
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
