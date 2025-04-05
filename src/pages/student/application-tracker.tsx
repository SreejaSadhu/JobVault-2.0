
import React, { useState } from 'react';
import StudentSidebar from '@/components/student/sidebar';
import Header from '@/components/shared/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Briefcase, 
  Check, 
  X, 
  AlertCircle, 
  ExternalLink, 
  Building,
  FileText
} from 'lucide-react';

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    company: 'Microsoft',
    role: 'Software Development Engineer',
    appliedDate: '2025-04-01',
    interviewDate: '2025-04-15',
    status: 'Shortlisted',
    jobId: 1
  },
  {
    id: 2,
    company: 'Google',
    role: 'Associate Product Manager',
    appliedDate: '2025-04-02',
    interviewDate: null,
    status: 'Pending',
    jobId: 2
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'Software Development Engineer',
    appliedDate: '2025-04-03',
    interviewDate: '2025-04-10',
    status: 'Rejected',
    jobId: 3
  },
  {
    id: 4,
    company: 'TCS',
    role: 'Systems Engineer',
    appliedDate: '2025-04-05',
    interviewDate: '2025-04-18',
    status: 'Shortlisted',
    jobId: 4
  }
];

const ApplicationTracker = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter applications based on active tab
  const filteredApplications = activeTab === 'all' 
    ? mockApplications 
    : mockApplications.filter(app => app.status.toLowerCase() === activeTab);
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'shortlisted':
        return 'bg-green-500/10 text-green-500 border-0';
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-0';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-0';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'shortlisted':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <StudentSidebar>
      <Header 
        title="Application Tracker" 
        subtitle="Track the status of your job applications" 
      />
      
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredApplications.length > 0 ? (
                filteredApplications.map(application => (
                  <Card key={application.id}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-primary" />
                            {application.company}
                          </CardTitle>
                          <CardDescription className="text-base font-medium text-foreground mt-1">
                            {application.role}
                          </CardDescription>
                        </div>
                        
                        <Badge 
                          variant="outline" 
                          className={`flex items-center gap-2 ${getStatusColor(application.status)}`}
                        >
                          {getStatusIcon(application.status)}
                          {application.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                        </div>
                        
                        {application.interviewDate && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Interview: {new Date(application.interviewDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                        <div className="md:col-span-2 lg:col-span-1 flex md:justify-end gap-2 mt-4 md:mt-0">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            View Application
                          </Button>
                          
                          <Button size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Job
                          </Button>
                        </div>
                      </div>
                      
                      {application.status === 'Shortlisted' && (
                        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                          <div className="flex items-center gap-2 font-medium mb-1">
                            <Check className="h-4 w-4" />
                            Next Steps
                          </div>
                          <p>
                            You've been shortlisted! Please prepare for the interview scheduled on {' '}
                            {application.interviewDate ? new Date(application.interviewDate).toLocaleDateString() : 'TBA'}.
                          </p>
                        </div>
                      )}
                      
                      {application.status === 'Rejected' && (
                        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                          <div className="flex items-center gap-2 font-medium mb-1">
                            <X className="h-4 w-4" />
                            Application Status
                          </div>
                          <p>
                            We're sorry, but your application wasn't selected for further rounds. 
                            Don't give up - keep applying for more opportunities!
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="p-10 text-center text-muted-foreground border rounded-lg">
                  <Briefcase className="h-10 w-10 mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-medium mb-1">No applications found</h3>
                  <p>You haven't applied to any jobs in this category yet</p>
                  <Button className="mt-4" onClick={() => window.location.href = '/student/placement-drives'}>
                    Browse Placement Drives
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </StudentSidebar>
  );
};

export default ApplicationTracker;
