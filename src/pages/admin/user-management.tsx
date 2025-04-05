
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/sidebar';
import Header from '@/components/shared/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Search, 
  Filter,
  User,
  Check,
  X,
  FileText,
  Trash2,
  Briefcase,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'student',
    course: 'B.Tech Computer Science',
    university: 'State University of Technology',
    graduationYear: '2024',
    phone: '(555) 123-4567',
    status: 'approved',
    applications: 4
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'student',
    course: 'B.Tech Electronics',
    university: 'National Institute of Technology',
    graduationYear: '2024',
    phone: '(555) 234-5678',
    status: 'pending',
    applications: 0
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'student',
    course: 'M.Tech Computer Science',
    university: 'State University of Technology',
    graduationYear: '2023',
    phone: '(555) 345-6789',
    status: 'approved',
    applications: 2
  },
  {
    id: 4,
    name: 'Jessica Lee',
    email: 'jessica@example.com',
    role: 'recruiter',
    company: 'Microsoft',
    position: 'HR Manager',
    phone: '(555) 456-7890',
    status: 'approved',
    postings: 3
  },
  {
    id: 5,
    name: 'David Martinez',
    email: 'david@example.com',
    role: 'recruiter',
    company: 'Google',
    position: 'Talent Acquisition Specialist',
    phone: '(555) 567-8901',
    status: 'pending',
    postings: 0
  }
];

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  
  // Filter users based on active tab and search term
  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'all' || 
                      activeTab === user.status || 
                      activeTab === user.role;
    
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (user.role === 'student' && user.course && user.course.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (user.role === 'recruiter' && user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });
  
  const approveUser = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'approved' } : user
    ));
    toast.success('User approved successfully');
  };
  
  const rejectUser = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'rejected' } : user
    ));
    toast.success('User rejected');
  };
  
  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success('User deleted successfully');
  };
  
  return (
    <AdminSidebar>
      <Header 
        title="User Management" 
        subtitle="Manage and approve student and recruiter accounts" 
      />
      
      <main className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, email, course or company..."
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="student">Students</TabsTrigger>
            <TabsTrigger value="recruiter">Recruiters</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>User List</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredUsers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Email</th>
                          <th className="text-left py-3 px-4 font-medium">Role</th>
                          <th className="text-left py-3 px-4 font-medium">Details</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                  <User className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                {user.email}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className="capitalize">
                                {user.role}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              {user.role === 'student' ? (
                                <div className="text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4" />
                                    {user.university}
                                  </div>
                                  <div>
                                    {user.course}, {user.graduationYear}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    {user.company}
                                  </div>
                                  <div>{user.position}</div>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <Badge 
                                variant="outline" 
                                className={
                                  user.status === 'approved' ? 'bg-green-500/10 text-green-500 border-0' :
                                  user.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-0' :
                                  'bg-red-500/10 text-red-500 border-0'
                                }
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                
                                {user.status === 'pending' && (
                                  <>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-green-500 hover:text-green-600 hover:bg-green-50 hover:border-green-200"
                                      onClick={() => approveUser(user.id)}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                                      onClick={() => rejectUser(user.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                                
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
                                  onClick={() => deleteUser(user.id)}
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
                    <User className="h-10 w-10 mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-medium mb-1">No users found</h3>
                    <p>Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </AdminSidebar>
  );
};

export default UserManagement;
