
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Calendar, 
  BarChart3, 
  Award, 
  Bell, 
  Search, 
  User,
  BookOpen,
  Briefcase,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Logo } from '@/components/ui/logo';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:block">
        <div className="p-6">
          <Logo />
        </div>
        
        <nav className="px-3 py-4">
          <div className="space-y-1">
            {[
              { icon: Home, label: 'Dashboard', href: '/dashboard/student', active: true },
              { icon: FileText, label: 'Resume Builder', href: '#' },
              { icon: Calendar, label: 'Test Schedule', href: '#' },
              { icon: BarChart3, label: 'Performance', href: '#' },
              { icon: Award, label: 'Skill Analysis', href: '#' },
              { icon: Briefcase, label: 'Job Matches', href: '#' },
            ].map((item, index) => (
              <Link 
                key={index}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  item.active 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 border-b border-border px-6 flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <Logo />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10 w-64" 
                placeholder="Search..." 
              />
            </div>
            
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Good morning, Alex</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your placement journey today.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Resume Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">82<span className="text-sm text-muted-foreground">/100</span></div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-0">
                    +4 points
                  </Badge>
                </div>
                <Progress value={82} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  Your resume is strong but needs a few improvements
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Upcoming Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Next test: Amazon Coding Challenge (Tomorrow)
                </p>
                <Button variant="link" className="p-0 h-auto text-xs mt-2">
                  View schedule
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Skills Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">78<span className="text-sm text-muted-foreground">%</span></div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-0">
                    +2.5%
                  </Badge>
                </div>
                <Progress value={78} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  You've made good progress in React & Node.js
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Job Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-muted-foreground mt-2">
                  New match: Software Engineer at Microsoft
                </p>
                <Button variant="link" className="p-0 h-auto text-xs mt-2">
                  View matches
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Resume Enhancement */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Resume Enhancement</h2>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>AI Resume Suggestions</CardTitle>
                    <CardDescription>Based on our analysis of your resume</CardDescription>
                  </div>
                  <Badge>3 new suggestions</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Add quantifiable achievements</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Include metrics like "improved performance by 40%" in your work experience.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Highlight Cloud Certifications</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Add AWS Cloud Practitioner certification to stand out for cloud roles.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Add your GitHub profile</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your portfolio projects would be more impactful with GitHub links.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tests */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Upcoming Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  company: 'Amazon',
                  position: 'Software Development Engineer',
                  date: 'Tomorrow, 2:00 PM',
                  duration: '90 minutes',
                  topics: ['Data Structures', 'Algorithms', 'System Design']
                },
                {
                  company: 'Microsoft',
                  position: 'Frontend Developer',
                  date: 'Nov 15, 10:00 AM',
                  duration: '60 minutes',
                  topics: ['JavaScript', 'React', 'CSS']
                },
                {
                  company: 'Google',
                  position: 'Software Engineer',
                  date: 'Nov 18, 3:00 PM',
                  duration: '120 minutes',
                  topics: ['Problem Solving', 'Coding', 'Object-Oriented Design']
                }
              ].map((test, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-2 bg-primary w-full" />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{test.company}</CardTitle>
                        <CardDescription>{test.position}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs">{test.duration}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm mb-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{test.date}</span>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-muted-foreground mb-2">Topics covered:</div>
                      <div className="flex flex-wrap gap-2">
                        {test.topics.map((topic, i) => (
                          <Badge key={i} variant="secondary">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button size="sm" variant="outline">Prepare</Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Skill Development */}
          <div>
            <h2 className="text-xl font-bold mb-4">Skill Development</h2>
            <Card>
              <CardHeader>
                <CardTitle>Your Skills Progress</CardTitle>
                <CardDescription>Based on your resume and test performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { skill: 'JavaScript', progress: 85, level: 'Advanced' },
                    { skill: 'React.js', progress: 78, level: 'Intermediate' },
                    { skill: 'Node.js', progress: 65, level: 'Intermediate' },
                    { skill: 'System Design', progress: 42, level: 'Beginner' },
                    { skill: 'Data Structures', progress: 58, level: 'Intermediate' }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.skill}</span>
                          <Badge variant="outline" className="text-xs font-normal">
                            {skill.level}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Skill gap: <span className="text-foreground font-medium">System Design, Data Structures</span>
                  </p>
                  <Button variant="link" className="p-0 h-auto">
                    View recommended learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
