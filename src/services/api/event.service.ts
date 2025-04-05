
import { mockFetch } from './mock-fetch';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  company?: string;
  eventType: 'info_session' | 'workshop' | 'test' | 'interview' | 'deadline' | 'other';
  createdBy: string;
  createdAt?: string;
}

class EventService {
  async getAllEvents(): Promise<CalendarEvent[]> {
    const response = await mockFetch('/api/events', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch events');
    }

    return response.data || [];
  }

  async getEventById(id: string): Promise<CalendarEvent> {
    const response = await mockFetch(`/api/events/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch event');
    }

    return response.data;
  }

  async createEvent(eventData: Omit<CalendarEvent, 'id' | 'createdAt'>): Promise<CalendarEvent> {
    const response = await mockFetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to create event');
    }

    return response.data;
  }

  async updateEvent(id: string, eventData: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const response = await mockFetch(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to update event');
    }

    return response.data;
  }

  async deleteEvent(id: string): Promise<void> {
    const response = await mockFetch(`/api/events/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(response.message || 'Failed to delete event');
    }
  }
}

export const eventService = new EventService();
