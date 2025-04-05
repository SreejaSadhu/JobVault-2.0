
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/sidebar';
import Header from '@/components/shared/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Trash2, 
  Edit,
  Briefcase,
  FileText
} from 'lucide-react';

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: 'Microsoft Technical Interview',
    date: '2025-04-15',
    time: '10:00 AM - 4:00 PM',
    type: 'interview',
    location: 'Main Campus, Room 301',
    description: 'Technical interview for shortlisted candidates for the Microsoft SDE role.',
    eligibility: 'Shortlisted students only'
  },
  {
    id: 2,
    title: 'Resume Building Workshop',
    date: '2025-04-10',
    time: '3:00 PM - 5:00 PM',
    type: 'workshop',
    location: 'College Auditorium',
    description: 'Learn how to build an effective resume that highlights your skills and experiences.',
    eligibility: 'All students'
  },
  {
    id: 3,
    title: 'Google Pre-placement Talk',
    date: '2025-04-20',
    time: '2:00 PM - 3:30 PM',
    type: 'presentation',
    location: 'Virtual (Zoom)',
    description: 'Google representatives will introduce their company culture, roles, and interview process.',
    eligibility: 'All final year students'
  },
  {
    id: 4,
    title: 'Mock Technical Interview Session',
    date: '2025-04-25',
    time: '10:00 AM - 5:00 PM',
    type: 'interview',
    location: 'Placement Cell, Main Building',
    description: 'Practice interviews with industry experts to prepare for actual interviews.',
    eligibility: 'Pre-registered students only'
  },
  {
    id: 5,
    title: 'Amazon Coding Test',
    date: '2025-05-02',
    time: '9:00 AM - 12:00 PM',
    type: 'test',
    location: 'Computer Lab 1 & 2',
    description: 'Online coding assessment for Amazon SDE positions.',
    eligibility: 'Registered students (CSE, IT, ECE)'
  }
];

// Group events by month and date
const groupEventsByDate = (events: any[]) => {
  const grouped: Record<string, any[]> = {};
  
  events.forEach(event => {
    const date = event.date;
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(event);
  });
  
  // Sort by date
  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
    .reduce((acc: Record<string, any[]>, [date, events]) => {
      acc[date] = events;
      return acc;
    }, {});
};

const EventCalendar = () => {
  const [events, setEvents] = useState(mockEvents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'presentation',
    location: '',
    description: '',
    eligibility: ''
  });
  
  const groupedEvents = groupEventsByDate(events);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddEvent = () => {
    // Validation
    if (!formData.title || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newEvent = {
      id: Date.now(),
      ...formData
    };
    
    setEvents([...events, newEvent]);
    toast.success('Event created successfully');
    setIsAddDialogOpen(false);
    setFormData({
      title: '',
      date: '',
      time: '',
      type: 'presentation',
      location: '',
      description: '',
      eligibility: ''
    });
  };
  
  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success('Event deleted successfully');
  };
  
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'workshop':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'presentation':
        return <Briefcase className="h-4 w-4 text-green-500" />;
      case 'test':
        return <FileText className="h-4 w-4 text-red-500" />;
      default:
        return <CalendarIcon className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <AdminSidebar>
      <Header 
        title="Event Calendar" 
        subtitle="Manage interview schedules and college events" 
      />
      
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Add details for a new event to the placement calendar
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title*</Label>
                  <Input 
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date*</Label>
                    <Input 
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Event Time</Label>
                    <Input 
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="e.g., 10:00 AM - 2:00 PM"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleSelectChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="presentation">Pre-placement Talk</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="test">Test/Assessment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter event location"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="eligibility">Eligibility</Label>
                  <Input 
                    id="eligibility"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    placeholder="Who can attend this event?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the event details"
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>
                  Create Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Event Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(groupedEvents).length > 0 ? (
              <div className="space-y-8">
                {Object.entries(groupedEvents).map(([date, dateEvents]) => (
                  <div key={date} className="relative">
                    <div className="sticky top-0 bg-background z-10 py-2">
                      <h3 className="text-lg font-medium flex items-center">
                        <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                        {formatDate(date)}
                      </h3>
                    </div>
                    
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-muted">
                      {dateEvents.map((event: any) => (
                        <div key={event.id} className="relative pl-6">
                          <div className="absolute left-[-6px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary"></div>
                          
                          <div className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium flex items-center gap-2">
                                  {event.title}
                                  <Badge variant="outline" className="ml-2">
                                    {event.type}
                                  </Badge>
                                </h4>
                                
                                <div className="text-sm text-muted-foreground mt-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Clock className="h-4 w-4" />
                                    {event.time}
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mb-1">
                                    <MapPin className="h-4 w-4" />
                                    {event.location}
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {event.eligibility}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                                  onClick={() => deleteEvent(event.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {event.description && (
                              <p className="mt-3 text-sm text-muted-foreground border-t pt-3">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center text-muted-foreground">
                <CalendarIcon className="h-10 w-10 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-1">No events scheduled</h3>
                <p>Add your first event using the button above</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </AdminSidebar>
  );
};

export default EventCalendar;
