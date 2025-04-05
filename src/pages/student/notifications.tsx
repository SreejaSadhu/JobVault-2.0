
import React, { useState } from 'react';
import StudentSidebar from '@/components/student/sidebar';
import Header from '@/components/shared/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell,
  Calendar,
  Briefcase,
  FileText,
  AlertCircle,
  MailOpen,
  Clock,
  Check
} from 'lucide-react';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'job',
    title: 'New job posting: Software Engineer at Microsoft',
    description: 'Microsoft has posted a new job opening for the role of Software Engineer.',
    timestamp: '2025-04-04T10:30:00',
    read: false,
    actionLink: '/student/placement-drives'
  },
  {
    id: 2,
    type: 'application',
    title: 'Application Status Update: Google',
    description: 'Your application for Associate Product Manager at Google has been shortlisted.',
    timestamp: '2025-04-03T14:45:00',
    read: true,
    actionLink: '/student/application-tracker'
  },
  {
    id: 3,
    type: 'event',
    title: 'Upcoming Resume Workshop',
    description: 'Don\'t miss the resume building workshop on April 10th at 3:00 PM in the College Auditorium.',
    timestamp: '2025-04-02T09:15:00',
    read: false,
    actionLink: '#'
  },
  {
    id: 4,
    type: 'deadline',
    title: 'Application Deadline Reminder',
    description: 'The application deadline for Amazon SDE role is tomorrow at 11:59 PM.',
    timestamp: '2025-04-01T16:20:00',
    read: true,
    actionLink: '/student/placement-drives'
  },
  {
    id: 5,
    type: 'job',
    title: 'New job posting: Systems Engineer at TCS',
    description: 'TCS has posted a new job opening for Systems Engineer role.',
    timestamp: '2025-03-31T11:05:00',
    read: false,
    actionLink: '/student/placement-drives'
  }
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);
  
  // Filter notifications based on active tab
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread'
    ? notifications.filter(notification => !notification.read)
    : notifications.filter(notification => notification.type === activeTab);
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'application':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'deadline':
        return <Clock className="h-5 w-5 text-red-500" />;
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
    <StudentSidebar>
      <Header 
        title="Notifications" 
        subtitle="Stay updated with important announcements and updates" 
      />
      
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {notifications.filter(n => !n.read).length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {notifications.filter(n => !n.read).length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="job">Jobs</TabsTrigger>
                <TabsTrigger value="application">Applications</TabsTrigger>
                <TabsTrigger value="event">Events</TabsTrigger>
              </TabsList>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
                disabled={!notifications.some(n => !n.read)}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            </div>
          </Tabs>
        </div>
        
        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredNotifications.length > 0 ? (
                <div className="space-y-1">
                  {filteredNotifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-4 border-b last:border-0 ${!notification.read ? 'bg-muted/30' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-base font-medium">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          
                          <div className="flex justify-between items-center mt-3">
                            <Button
                              variant="link"
                              className="p-0 h-auto text-primary"
                              asChild
                            >
                              <a href={notification.actionLink}>View Details</a>
                            </Button>
                            
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs h-7"
                              >
                                <MailOpen className="h-3 w-3 mr-1" />
                                Mark as read
                              </Button>
                            )}
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
                  <p>You're all caught up!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </main>
    </StudentSidebar>
  );
};

export default Notifications;
