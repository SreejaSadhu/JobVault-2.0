
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Award, 
  Settings, 
  Bell, 
  Search, 
  User,
  Filter,
  Plus,
  ArrowRight,
  Clock,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Logo } from '@/components/ui/logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDashboard = () => {
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
              { icon: Home, label: 'Dashboard', href: '/dashboard/admin', active: true },
              { icon: Users, label: 'Candidates', href: '#' },
              { icon: Calendar, label: 'Test Management', href: '#' },
              { icon: FileText, label: 'Applications', href: '#' },
              { icon: Award, label: 'Analytics', href: '#' },
              { icon: Settings, label: 'Settings', href: '#' },
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
                placeholder="Search candidates..." 
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
            <h1 className="text-2xl font-bold mb-1">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">
              Manage candidate applications and test assessments.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Assessments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-xs text-muted-foreground mt-2">
                  2 ending this week
                </p>
                <Button variant="link" className="p-0 h-auto text-xs mt-2">
                  View details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Candidates Screened
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">124</div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-0">
                    +12 today
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  28 shortlisted candidates
                </p>
                <Button variant="link" className="p-0 h-auto text-xs mt-2">
                  View all
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  AI Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">86%</div>
                <Progress value={86} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  15 high-quality matches available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Time Saved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">48h</div>
                <p className="text-xs text-muted-foreground mt-2">
                  This month with AI-powered screening
                </p>
                <Button variant="link" className="p-0 h-auto text-xs mt-2">
                  View analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Candidate Management */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Candidate Management</h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  New Assessment
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Candidates</TabsTrigger>
                    <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                    <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
                    <TabsTrigger value="offered">Offered</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10" 
                        placeholder="Search candidates..." 
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced Filter
                    </Button>
                  </div>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="all" className="mt-0">
                  <div className="rounded-md border">
                    <div className="bg-muted/50 p-3 grid grid-cols-12 text-sm font-medium">
                      <div className="col-span-3">Name</div>
                      <div className="col-span-2">Position</div>
                      <div className="col-span-2">Skills Match</div>
                      <div className="col-span-2">Test Score</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-1">Action</div>
                    </div>
                    
                    {[
                      {
                        name: 'Emily Johnson',
                        position: 'Frontend Developer',
                        match: 92,
                        score: 88,
                        status: 'Shortlisted'
                      },
                      {
                        name: 'Michael Brown',
                        position: 'Data Scientist',
                        match: 87,
                        score: 92,
                        status: 'Interviewed'
                      },
                      {
                        name: 'Sarah Wilson',
                        position: 'UI/UX Designer',
                        match: 95,
                        score: 85,
                        status: 'Shortlisted'
                      },
                      {
                        name: 'David Martinez',
                        position: 'Backend Developer',
                        match: 78,
                        score: 76,
                        status: 'New'
                      },
                      {
                        name: 'Jessica Lee',
                        position: 'Product Manager',
                        match: 91,
                        score: 88,
                        status: 'Offered'
                      }
                    ].map((candidate, index) => (
                      <div 
                        key={index} 
                        className="p-3 grid grid-cols-12 items-center text-sm border-t hover:bg-muted/20 transition-colors"
                      >
                        <div className="col-span-3 font-medium">{candidate.name}</div>
                        <div className="col-span-2 text-muted-foreground">{candidate.position}</div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${candidate.match >= 90 ? 'text-primary' : 'text-muted-foreground'}`}>
                              {candidate.match}%
                            </span>
                            <Progress value={candidate.match} className="h-1 w-16" />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${candidate.score >= 85 ? 'text-primary' : 'text-muted-foreground'}`}>
                              {candidate.score}/100
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Badge 
                            variant="outline" 
                            className={
                              candidate.status === 'Shortlisted' ? 'bg-primary/10 text-primary border-0' :
                              candidate.status === 'Interviewed' ? 'bg-amber-500/10 text-amber-500 border-0' :
                              candidate.status === 'Offered' ? 'bg-green-500/10 text-green-500 border-0' :
                              'bg-muted text-muted-foreground'
                            }
                          >
                            {candidate.status}
                          </Badge>
                        </div>
                        <div className="col-span-1">
                          <Button size="icon" variant="ghost">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="shortlisted" className="mt-0">
                  <div className="p-8 text-center text-muted-foreground">
                    <p>Select "All Candidates" to view the candidate list</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="interviewed" className="mt-0">
                  <div className="p-8 text-center text-muted-foreground">
                    <p>Select "All Candidates" to view the candidate list</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="offered" className="mt-0">
                  <div className="p-8 text-center text-muted-foreground">
                    <p>Select "All Candidates" to view the candidate list</p>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </div>

          {/* Test Management */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Active Assessments</h2>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Create Assessment
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Frontend Developer Assessment',
                  candidates: 42,
                  completed: 28,
                  progress: 67,
                  due: 'Nov 15, 2023',
                  time: '3 days left'
                },
                {
                  title: 'Backend Node.js Challenge',
                  candidates: 36,
                  completed: 20,
                  progress: 56,
                  due: 'Nov 18, 2023',
                  time: '6 days left'
                },
                {
                  title: 'Data Science Evaluation',
                  candidates: 24,
                  completed: 12,
                  progress: 50,
                  due: 'Nov 20, 2023',
                  time: '8 days left'
                },
                {
                  title: 'UI/UX Design Challenge',
                  candidates: 18,
                  completed: 15,
                  progress: 83,
                  due: 'Nov 12, 2023',
                  time: 'Tomorrow'
                }
              ].map((assessment, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{assessment.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Due: {assessment.due} ({assessment.time})</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          Completion: {assessment.completed}/{assessment.candidates} candidates
                        </span>
                        <span className="text-sm font-medium">
                          {assessment.progress}%
                        </span>
                      </div>
                      <Progress value={assessment.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Check className="h-4 w-4 mr-1" /> Results
                        </Button>
                        <Button size="sm" variant="outline" className="h-8">
                          <X className="h-4 w-4 mr-1" /> End Test
                        </Button>
                      </div>
                      <Button size="sm" className="h-8">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <h2 className="text-xl font-bold mb-4">AI Recruitment Insights</h2>
            <Card>
              <CardHeader>
                <CardTitle>Candidate Skill Distribution</CardTitle>
                <CardDescription>
                  AI analysis of candidates' skills based on resumes and test results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { skill: 'JavaScript', candidates: 85, demand: 'High' },
                    { skill: 'React.js', candidates: 62, demand: 'Very High' },
                    { skill: 'Node.js', candidates: 48, demand: 'High' },
                    { skill: 'Python', candidates: 72, demand: 'Medium' },
                    { skill: 'Data Science', candidates: 35, demand: 'High' }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.skill}</span>
                          <Badge 
                            variant="outline" 
                            className={
                              skill.demand === 'Very High' ? 'bg-green-500/10 text-green-500 border-0' :
                              skill.demand === 'High' ? 'bg-primary/10 text-primary border-0' :
                              'bg-amber-500/10 text-amber-500 border-0'
                            }
                          >
                            {skill.demand} Demand
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.candidates} candidates</span>
                      </div>
                      <Progress value={skill.candidates} max={100} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-2">AI Recommendations:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-3 w-3 rounded-full bg-primary/30 flex-shrink-0" />
                      <p>Consider expanding React.js hiring - high demand with qualified candidates</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-3 w-3 rounded-full bg-primary/30 flex-shrink-0" />
                      <p>Data Science talent gap detected - current candidate pool lacks necessary expertise</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-3 w-3 rounded-full bg-primary/30 flex-shrink-0" />
                      <p>Python candidates have lower test scores - consider more rigorous screening</p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
