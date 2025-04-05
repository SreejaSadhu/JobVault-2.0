
import React, { useState } from 'react';
import StudentSidebar from '@/components/student/sidebar';
import Header from '@/components/shared/header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  Book, 
  Building, 
  Calendar, 
  FileText, 
  Upload, 
  Briefcase, 
  Award
} from 'lucide-react';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: localStorage.getItem('userName') || 'Alex Johnson',
    email: localStorage.getItem('userEmail') || 'alex@example.com',
    phone: '(555) 123-4567',
    course: 'B.Tech Computer Science',
    university: 'State University of Technology',
    graduationYear: '2024',
    cgpa: '8.7',
    skills: 'JavaScript, React, Node.js, MongoDB, Express',
    about: 'Passionate computer science student with interest in web development and data structures.',
    resumeFile: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real app, you would upload this file to your server
      setProfileData(prev => ({
        ...prev,
        resumeFile: file
      }));
      toast.success('Resume selected successfully');
    }
  };

  const handleSave = () => {
    // In a real app, you would save this data to your backend
    localStorage.setItem('userName', profileData.name);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <StudentSidebar>
      <Header 
        title="My Profile" 
        subtitle="Manage your personal information and resume" 
      />
      
      <main className="p-6">
        <Tabs defaultValue="personal">
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "outline" : "default"} 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input 
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Phone Number
                    </Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="about" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      About Me
                    </Label>
                    <Input 
                      id="about"
                      name="about"
                      value={profileData.about}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="education">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Education Details</CardTitle>
                    <CardDescription>Your academic information</CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "outline" : "default"} 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Details'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="course" className="flex items-center gap-2">
                      <Book className="h-4 w-4 text-muted-foreground" />
                      Course/Degree
                    </Label>
                    <Input 
                      id="course"
                      name="course"
                      value={profileData.course}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="university" className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      University/College
                    </Label>
                    <Input 
                      id="university"
                      name="university"
                      value={profileData.university}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Graduation Year
                    </Label>
                    <Input 
                      id="graduationYear"
                      name="graduationYear"
                      value={profileData.graduationYear}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cgpa" className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      CGPA/Percentage
                    </Label>
                    <Input 
                      id="cgpa"
                      name="cgpa"
                      value={profileData.cgpa}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="skills" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      Skills
                    </Label>
                    <Input 
                      id="skills"
                      name="skills"
                      value={profileData.skills}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle>Resume / CV</CardTitle>
                <CardDescription>Upload your latest resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">Upload your resume</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      PDF, DOCX or DOC (Max 5MB)
                    </p>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button>Choose File</Button>
                    </div>
                    {profileData.resumeFile && (
                      <p className="text-sm text-muted-foreground mt-4">
                        Selected file: {profileData.resumeFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4 flex justify-between">
                <div>
                  <h4 className="font-medium">Current Resume</h4>
                  <p className="text-sm text-muted-foreground">
                    {profileData.resumeFile ? profileData.resumeFile.name : 'No resume uploaded'}
                  </p>
                </div>
                {profileData.resumeFile && (
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Resume
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </StudentSidebar>
  );
};

export default StudentProfile;
