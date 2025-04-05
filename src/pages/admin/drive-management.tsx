
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/sidebar';
import Header from '@/components/shared/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Briefcase,
  Clock,
  MapPin,
  DollarSign
} from 'lucide-react';

// Mock drives data
const mockDrives = [
  {
    id: 1,
    company: 'Microsoft',
    role: 'Software Development Engineer',
    location: 'Redmond, WA (Remote)',
    salary: '$120,000 - $150,000',
    createdDate: '2025-04-01',
    deadline: '2025-05-15',
    eligibility: 'CGPA 8.0+, CSE/IT/ECE',
    description: 'Join Microsoft as a Software Development Engineer to work on cutting-edge technologies...',
    status: 'active',
    applicants: 45
  },
  {
    id: 2,
    company: 'Google',
    role: 'Associate Product Manager',
    location: 'Bangalore, India',
    salary: '₹18,00,000 - ₹25,00,000',
    createdDate: '2025-04-02',
    deadline: '2025-05-20',
    eligibility: 'CGPA 8.5+, Any Discipline',
    description: 'As an APM at Google, you will be responsible for leading the development of products...',
    status: 'active',
    applicants: 32
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'Software Development Engineer',
    location: 'Seattle, WA',
    salary: '$125,000 - $155,000',
    createdDate: '2025-04-03',
    deadline: '2025-05-25',
    eligibility: 'CGPA 7.5+, CSE/IT',
    description: 'Amazon is looking for a Software Development Engineer to join our team...',
    status: 'active',
    applicants: 38
  },
  {
    id: 4,
    company: 'TCS',
    role: 'Systems Engineer',
    location: 'Multiple Locations, India',
    salary: '₹3,50,000 - ₹7,00,000',
    createdDate: '2025-03-30',
    deadline: '2025-06-01',
    eligibility: 'CGPA 6.0+, Any Engineering',
    description: 'Join TCS as a Systems Engineer and work on client projects across various domains...',
    status: 'active',
    applicants: 56
  },
  {
    id: 5,
    company: 'IBM',
    role: 'Data Scientist',
    location: 'New York, NY',
    salary: '$110,000 - $140,000',
    createdDate: '2025-03-28',
    deadline: '2025-05-10',
    eligibility: 'CGPA 8.0+, CSE/IT/Statistics',
    description: 'IBM is seeking a talented Data Scientist to join our growing team...',
    status: 'closed',
    applicants: 29
  }
];

const DriveManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [drives, setDrives] = useState(mockDrives);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    salary: '',
    deadline: '',
    eligibility: '',
    description: ''
  });
  
  // Filter drives based on search term
  const filteredDrives = drives.filter(drive => 
    drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drive.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddDrive = () => {
    // Validation
    if (!formData.company || !formData.role || !formData.deadline) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newDrive = {
      id: drives.length + 1,
      ...formData,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'active',
      applicants: 0
    };
    
    setDrives([newDrive, ...drives]);
    toast.success('Placement drive created successfully');
    setIsAddDialogOpen(false);
    setFormData({
      company: '',
      role: '',
      location: '',
      salary: '',
      deadline: '',
      eligibility: '',
      description: ''
    });
  };
  
  const closeDrive = (id: number) => {
    setDrives(drives.map(drive => 
      drive.id === id ? { ...drive, status: 'closed' } : drive
    ));
    toast.success('Drive closed successfully');
  };
  
  const deleteDrive = (id: number) => {
    setDrives(drives.filter(drive => drive.id !== id));
    toast.success('Drive deleted successfully');
  };
  
  return (
    <AdminSidebar>
      <Header 
        title="Drive Management" 
        subtitle="Create and manage placement drives" 
      />
      
      <main className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search drives..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Drive
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Placement Drive</DialogTitle>
                  <DialogDescription>
                    Add details for the new job opening to announce it to students
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name*</Label>
                    <Input 
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Role*</Label>
                    <Input 
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input 
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline*</Label>
                    <Input 
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eligibility">Eligibility Criteria</Label>
                    <Input 
                      id="eligibility"
                      name="eligibility"
                      value={formData.eligibility}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddDrive}>
                    Create Drive
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Placement Drives</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredDrives.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Job Details</th>
                      <th className="text-left py-3 px-4 font-medium">Created</th>
                      <th className="text-left py-3 px-4 font-medium">Deadline</th>
                      <th className="text-left py-3 px-4 font-medium">Eligibility</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-center py-3 px-4 font-medium">Applicants</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDrives.map(drive => (
                      <tr key={drive.id} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="py-3 px-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-primary" />
                              <span className="font-medium">{drive.company}</span>
                            </div>
                            <div className="text-muted-foreground mt-1">{drive.role}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3" />
                              {drive.location}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <DollarSign className="h-3 w-3" />
                              {drive.salary}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(drive.createdDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {new Date(drive.deadline).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate" title={drive.eligibility}>
                          {drive.eligibility}
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            variant="outline" 
                            className={
                              drive.status === 'active' 
                                ? 'bg-green-500/10 text-green-500 border-0' 
                                : 'bg-red-500/10 text-red-500 border-0'
                            }
                          >
                            {drive.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="secondary">
                            {drive.applicants}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            {drive.status === 'active' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-amber-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200"
                                onClick={() => closeDrive(drive.id)}
                              >
                                Close
                              </Button>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                              onClick={() => deleteDrive(drive.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center text-muted-foreground">
                <Briefcase className="h-10 w-10 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-1">No drives found</h3>
                <p>Try adjusting your search criteria or create a new drive</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </AdminSidebar>
  );
};

export default DriveManagement;
