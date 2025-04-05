
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/sidebar';
import Header from '@/components/shared/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Search, 
  Filter,
  User,
  Check,
  X,
  FileText,
  Calendar,
  DownloadCloud,
  ArrowDown,
  ArrowUp,
  Mail,
  Phone
} from 'lucide-react';

// Mock applications data
const mockApplications = [
  {
    id: 1,
    student: {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '(555) 123-4567',
      course: 'B.Tech Computer Science',
      cgpa: 8.7
    },
    job: {
      id: 1,
      company: 'Microsoft',
      role: 'Software Development Engineer'
    },
    appliedDate: '2025-04-01',
    status: 'shortlisted',
    resumeUrl: '#'
  },
  {
    id: 2,
    student: {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '(555) 345-6789',
      course: 'M.Tech Computer Science',
      cgpa: 9.2
    },
    job: {
      id: 1,
      company: 'Microsoft',
      role: 'Software Development Engineer'
    },
    appliedDate: '2025-04-02',
    status: 'pending',
    resumeUrl: '#'
  },
  {
    id: 3,
    student: {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '(555) 123-4567',
      course: 'B.Tech Computer Science',
      cgpa: 8.7
    },
    job: {
      id: 2,
      company: 'Google',
      role: 'Associate Product Manager'
    },
    appliedDate: '2025-04-03',
    status: 'pending',
    resumeUrl: '#'
  },
  {
    id: 4,
    student: {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '(555) 345-6789',
      course: 'M.Tech Computer Science',
      cgpa: 9.2
    },
    job: {
      id: 3,
      company: 'Amazon',
      role: 'Software Development Engineer'
    },
    appliedDate: '2025-04-04',
    status: 'rejected',
    resumeUrl: '#'
  }
];

// Extract unique job options
const jobOptions = Array.from(new Set(mockApplications.map(app => app.job.company)));

const ApplicationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [companyFilter, setCompanyFilter] = useState<string>('');
  const [applications, setApplications] = useState(mockApplications);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || app.status === statusFilter;
    const matchesCompany = !companyFilter || app.job.company === companyFilter;
    
    return matchesSearch && matchesStatus && matchesCompany;
  });
  
  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue, bValue;
    
    switch (sortField) {
      case 'name':
        aValue = a.student.name;
        bValue = b.student.name;
        break;
      case 'company':
        aValue = a.job.company;
        bValue = b.job.company;
        break;
      case 'role':
        aValue = a.job.role;
        bValue = b.job.role;
        break;
      case 'date':
        aValue = new Date(a.appliedDate);
        bValue = new Date(b.appliedDate);
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const updateStatus = (id: number, status: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
    toast.success(`Application ${status}`);
  };
  
  const exportData = () => {
    // In a real app, this would generate a CSV or Excel file
    toast.success('Data exported successfully');
  };
  
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };
  
  return (
    <AdminSidebar>
      <Header 
        title="Application Management" 
        subtitle="Review and manage student applications" 
      />
      
      <main className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start lg:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by student, company or role..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Companies</SelectItem>
                {jobOptions.map((company, index) => (
                  <SelectItem key={index} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="lg:ml-2">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
            
            <Button onClick={exportData}>
              <DownloadCloud className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Application List</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedApplications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center gap-1">
                          Student {getSortIcon('name')}
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort('company')}
                      >
                        <div className="flex items-center gap-1">
                          Company {getSortIcon('company')}
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort('role')}
                      >
                        <div className="flex items-center gap-1">
                          Role {getSortIcon('role')}
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort('date')}
                      >
                        <div className="flex items-center gap-1">
                          Applied Date {getSortIcon('date')}
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedApplications.map(application => (
                      <tr key={application.id} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="py-3 px-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">{application.student.name}</span>
                            </div>
                            <div className="pl-10 flex flex-col gap-1 mt-1">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                {application.student.email}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {application.student.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {application.job.company}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {application.job.role}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            variant="outline" 
                            className={
                              application.status === 'shortlisted' ? 'bg-green-500/10 text-green-500 border-0' :
                              application.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-0' :
                              'bg-red-500/10 text-red-500 border-0'
                            }
                          >
                            {application.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              asChild
                            >
                              <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4" />
                              </a>
                            </Button>
                            
                            {application.status === 'pending' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-green-500 hover:text-green-600 hover:bg-green-50 hover:border-green-200"
                                  onClick={() => updateStatus(application.id, 'shortlisted')}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                                  onClick={() => updateStatus(application.id, 'rejected')}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center text-muted-foreground">
                <FileText className="h-10 w-10 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-1">No applications found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </AdminSidebar>
  );
};

export default ApplicationManagement;
