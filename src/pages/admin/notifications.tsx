
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/sidebar';
import Header from '@/components/shared/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Bell,
  Calendar,
  Briefcase,
  FileText,
  Plus,
  Users,
  Trash2,
  Send
} from 'lucide-react';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: 'New Job Posting: Microsoft SDE Role',
    content: 'Microsoft has posted a new job opening for the role of Software Development Engineer.',
    type: 'job',
    sentTo: 'All Students',
    timestamp: '2025-04-04T10:30:00',
    readCount: 42
  },
  {
    id: 2,
    title: 'Resume Workshop Announcement',
    content: 'An interactive resume building workshop will be held on April 10th at 3:00 PM in the College Auditorium.',
    type: 'event',
    sentTo: 'All Students',
    timestamp: '2025-04-03T14:45:00',
    readCount: 38
  },
  {
    id: 3,
    title: 'Application Deadline Update: Google APM',
    content: 'The application deadline for Google Associate Product Manager role has been extended to May 25th.',
    type: 'deadline',
    sentTo: 'Computer Science, IT',
    timestamp: '2025-04-02T09:15:00',
    readCount: 26
  },
  {
    id: 4,
    title: 'Mock Interview Session',
    content: 'A mock interview session with industry experts will be conducted on April 15th. Register early as seats are limited.',
    type: 'event',
    sentTo: 'All Students',
    timestamp: '2025-04-01T16:20:00',
    readCount: 45
  },
  {
    id: 5,
    title: 'New Job Posting: TCS Systems Engineer',
    content: 'TCS has posted multiple openings for Systems Engineer role across various locations.',
    type: 'job',
    sentTo: 'All Branches',
    timestamp: '2025-03-31T11:05:00',
    readCount: 52
  }
];

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'announcement',
    sentTo: 'all'
  });
  
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
  
  const handleCreateNotification = () => {
    // Validation
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newNotification = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      type: formData.type,
      sentTo: formData.sentTo === 'all' ? 'All Students' : formData.sentTo,
      timestamp: new Date().toISOString(),
      readCount: 0
    };
    
    setNotifications([newNotification, ...notifications]);
    toast.success('Notification sent successfully');
    setIsCreateDialogOpen(false);
    setFormData({
      title: '',
      content: '',
      type: 'announcement',
      sentTo: 'all'
    });
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast.success('Notification deleted successfully');
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'deadline':
        return <FileText className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    } 
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
    
    return notificationTime.toLocaleDateString();
  };

  return (
    <AdminSidebar>
      <Header 
        title="Notifications" 
        subtitle="Create and manage notifications for students" 
      />
      
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Sent Notifications</h2>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
                <DialogDescription>
                  Send a notification to students about events, job postings, or announcements
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Notification Title*</Label>
                  <Input 
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a clear and concise title"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Notification Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleSelectChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="job">Job Posting</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sentTo">Send To</Label>
                    <Select 
                      value={formData.sentTo} 
                      onValueChange={(value) => handleSelectChange('sentTo', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Students</SelectItem>
                        <SelectItem value="Computer Science, IT">Computer Science & IT</SelectItem>
                        <SelectItem value="Electronics, Electrical">Electronics & Electrical</SelectItem>
                        <SelectItem value="Mechanical, Civil">Mechanical & Civil</SelectItem>
                        <SelectItem value="Final Year Students">Final Year Students</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Notification Content*</Label>
                  <Textarea 
                    id="content"
                    name="content"
                    rows={5}
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter the notification message"
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNotification}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-base font-medium flex items-center gap-2">
                              {notification.title}
                              <Badge variant="outline" className="ml-2">
                                {notification.type}
                              </Badge>
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Users className="h-3 w-3" />
                              <span>Sent to: {notification.sentTo}</span>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-2">
                          {notification.content}
                        </p>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-xs text-muted-foreground">
                            Read by {notification.readCount} user{notification.readCount !== 1 ? 's' : ''}
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center text-muted-foreground">
                <Bell className="h-10 w-10 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-1">No notifications found</h3>
                <p>Create your first notification using the button above</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </AdminSidebar>
  );
};

// Add a Label component
const Label = ({ children, htmlFor, className }: { children: React.ReactNode, htmlFor?: string, className?: string }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium ${className || ''}`}>
    {children}
  </label>
);

export default AdminNotifications;
