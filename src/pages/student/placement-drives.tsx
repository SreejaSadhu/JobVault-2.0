
import React, { useState } from 'react';
import StudentSidebar from '@/components/student/sidebar';
import Header from '@/components/shared/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Search, 
  Briefcase, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Filter, 
  BookmarkPlus, 
  BookmarkCheck,
  ArrowRight
} from 'lucide-react';

// Mock data for job drives
const mockDrives = [
  {
    id: 1,
    company: 'Microsoft',
    role: 'Software Development Engineer',
    location: 'Redmond, WA (Remote)',
    salary: '$120,000 - $150,000',
    deadline: '2025-05-15',
    eligibility: 'CGPA 8.0+, CSE/IT/ECE',
    description: 'Join Microsoft as a Software Development Engineer to work on cutting-edge technologies...',
    tags: ['Software', 'Full-time', 'Remote']
  },
  {
    id: 2,
    company: 'Google',
    role: 'Associate Product Manager',
    location: 'Bangalore, India',
    salary: '₹18,00,000 - ₹25,00,000',
    deadline: '2025-05-20',
    eligibility: 'CGPA 8.5+, Any Discipline',
    description: 'As an APM at Google, you will be responsible for leading the development of products...',
    tags: ['Product', 'Full-time', 'On-site']
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'Software Development Engineer',
    location: 'Seattle, WA',
    salary: '$125,000 - $155,000',
    deadline: '2025-05-25',
    eligibility: 'CGPA 7.5+, CSE/IT',
    description: 'Amazon is looking for a Software Development Engineer to join our team...',
    tags: ['Software', 'Full-time', 'Hybrid']
  },
  {
    id: 4,
    company: 'TCS',
    role: 'Systems Engineer',
    location: 'Multiple Locations, India',
    salary: '₹3,50,000 - ₹7,00,000',
    deadline: '2025-06-01',
    eligibility: 'CGPA 6.0+, Any Engineering',
    description: 'Join TCS as a Systems Engineer and work on client projects across various domains...',
    tags: ['IT Services', 'Full-time', 'On-site']
  },
  {
    id: 5,
    company: 'Infosys',
    role: 'Systems Engineer',
    location: 'Multiple Locations, India',
    salary: '₹3,80,000 - ₹6,50,000',
    deadline: '2025-06-05',
    eligibility: 'CGPA 6.0+, Any Engineering',
    description: 'Infosys is hiring fresh graduates for the role of Systems Engineer...',
    tags: ['IT Services', 'Full-time', 'On-site']
  }
];

const PlacementDrives = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  
  // Filter drives based on search term
  const filteredDrives = mockDrives.filter(drive => 
    drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drive.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drive.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleSaveJob = (id: number) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter(jobId => jobId !== id));
      toast.success('Job removed from saved jobs');
    } else {
      setSavedJobs([...savedJobs, id]);
      toast.success('Job saved successfully');
    }
  };
  
  const handleApply = (id: number) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs([...appliedJobs, id]);
      toast.success('Application submitted successfully');
    } else {
      toast('You have already applied for this job', {
        description: 'You can check your application status in the Application Tracker'
      });
    }
  };
  
  // Calculate days left for deadline
  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <StudentSidebar>
      <Header 
        title="Placement Drives" 
        subtitle="Browse and apply for placement opportunities" 
      />
      
      <main className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by company, role, or keywords..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDrives.length > 0 ? (
            filteredDrives.map(drive => (
              <Card key={drive.id} className="overflow-hidden">
                <div className="h-2 bg-primary w-full"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {drive.company}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleSaveJob(drive.id)}
                        >
                          {savedJobs.includes(drive.id) ? (
                            <BookmarkCheck className="h-4 w-4 text-primary" />
                          ) : (
                            <BookmarkPlus className="h-4 w-4" />
                          )}
                        </Button>
                      </CardTitle>
                      <CardDescription className="text-base font-medium text-foreground mt-1">
                        {drive.role}
                      </CardDescription>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-red-500 text-sm font-medium">
                        <Clock className="h-4 w-4" />
                        <span>
                          {getDaysLeft(drive.deadline) <= 0 
                            ? 'Deadline passed' 
                            : `${getDaysLeft(drive.deadline)} days left`}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2 justify-end">
                        {drive.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>{drive.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{drive.salary}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>Apply by: {new Date(drive.deadline).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-sm font-medium">Eligibility:</span>
                    <p className="text-muted-foreground">{drive.eligibility}</p>
                  </div>
                  
                  <p className="line-clamp-2 text-muted-foreground">{drive.description}</p>
                </CardContent>
                
                <CardFooter className="border-t flex justify-between pt-4">
                  <Button variant="outline" size="sm">
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="sm"
                    onClick={() => handleApply(drive.id)}
                    disabled={appliedJobs.includes(drive.id)}
                  >
                    {appliedJobs.includes(drive.id) ? 'Applied' : 'Apply Now'}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-1 lg:col-span-2 p-10 text-center text-muted-foreground border rounded-lg">
              <Briefcase className="h-10 w-10 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-1">No jobs found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>
    </StudentSidebar>
  );
};

export default PlacementDrives;
