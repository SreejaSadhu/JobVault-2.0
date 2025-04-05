
import { mockFetch } from './mock-fetch';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'job' | 'event' | 'application' | 'system';
  read: boolean;
  createdAt: string;
  relatedId?: string; // ID of related job, event, or application
}

class NotificationService {
  async getMyNotifications(): Promise<Notification[]> {
    const response = await mockFetch('/api/notifications', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch notifications');
    }

    return response.data || [];
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    const response = await mockFetch(`/api/notifications/${notificationId}/read`, {
      method: 'PUT',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to mark notification as read');
    }

    return response.data;
  }

  async markAllAsRead(): Promise<void> {
    const response = await mockFetch('/api/notifications/read-all', {
      method: 'PUT',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to mark all notifications as read');
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const response = await mockFetch(`/api/notifications/${notificationId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to delete notification');
    }
  }

  // Mock for sending FCM notifications - in real implementation, this would be done on the server
  async sendNotification(userId: string, notification: { 
    title: string; 
    message: string; 
    type: Notification['type'];
    relatedId?: string;
  }): Promise<Notification> {
    const response = await mockFetch('/api/notifications/send', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        ...notification
      }),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to send notification');
    }

    return response.data;
  }
}

export const notificationService = new NotificationService();
