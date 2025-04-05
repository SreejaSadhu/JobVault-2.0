
import React from 'react';
import AdminSidebar from '@/components/admin/sidebar';
import Header from '@/components/shared/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Mock data for analytics
const placementStats = [
  { department: 'Computer Science', placed: 85, total: 100 },
  { department: 'Electronics', placed: 65, total: 90 },
  { department: 'Mechanical', placed: 40, total: 70 },
  { department: 'Civil', placed: 30, total: 60 },
  { department: 'Chemical', placed: 25, total: 50 }
];

const companywiseStats = [
  { name: 'Microsoft', students: 15 },
  { name: 'Google', students: 12 },
  { name: 'Amazon', students: 18 },
  { name: 'TCS', students: 25 },
  { name: 'Infosys', students: 20 }
];

const salaryStats = [
  { range: '<5 LPA', count: 35 },
  { range: '5-10 LPA', count: 45 },
  { range: '10-15 LPA', count: 20 },
  { range: '15-20 LPA', count: 10 },
  { range: '>20 LPA', count: 5 }
];

const monthlyStats = [
  { name: 'Jan', placements: 12 },
  { name: 'Feb', placements: 15 },
  { name: 'Mar', placements: 18 },
  { name: 'Apr', placements: 22 },
  { name: 'May', placements: 25 },
  { name: 'Jun', placements: 30 },
  { name: 'Jul', placements: 28 },
  { name: 'Aug', placements: 24 },
  { name: 'Sep', placements: 20 },
  { name: 'Oct', placements: 18 },
  { name: 'Nov', placements: 16 },
  { name: 'Dec', placements: 14 }
];

const skillStats = [
  { skill: 'JavaScript', students: 120 },
  { skill: 'Python', students: 150 },
  { skill: 'Java', students: 90 },
  { skill: 'React', students: 80 },
  { skill: 'SQL', students: 110 }
];

const PlacementAnalytics = () => {
  // Calculate placement percentage for each department
  const departmentData = placementStats.map(dept => ({
    ...dept,
    percentage: Math.round((dept.placed / dept.total) * 100)
  }));
  
  // Calculate total placement percentage
  const totalPlaced = placementStats.reduce((sum, dept) => sum + dept.placed, 0);
  const totalStudents = placementStats.reduce((sum, dept) => sum + dept.total, 0);
  const overallPercentage = Math.round((totalPlaced / totalStudents) * 100);
  
  return (
    <AdminSidebar>
      <Header 
        title="Placement Analytics" 
        subtitle="Track and analyze placement statistics" 
      />
      
      <main className="p-6">
        {/* Overall Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Placement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{overallPercentage}%</div>
              <p className="text-xs text-muted-foreground mt-2">
                {totalPlaced} out of {totalStudents} students placed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Package
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹8.5 LPA</div>
              <p className="text-xs text-muted-foreground mt-2">
                12% increase from last year
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Participating Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <p className="text-xs text-muted-foreground mt-2">
                8 new companies this year
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Department-wise Placement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Department-wise Placement</CardTitle>
              <CardDescription>
                Percentage of students placed by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={departmentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Placement Rate']} />
                  <Legend />
                  <Bar dataKey="percentage" fill="#8884d8" name="Placement %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Company-wise Placement */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Company-wise Placement</CardTitle>
              <CardDescription>
                Number of students placed in top companies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={companywiseStats}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="students"
                  >
                    {companywiseStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Salary Distribution & Monthly Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Salary Distribution</CardTitle>
              <CardDescription>
                Distribution of placement packages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={salaryStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Placement Trend</CardTitle>
              <CardDescription>
                Placement statistics over months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={monthlyStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="placements" fill="#8884d8" name="Placements" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Skills Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Top Skills in Demand</CardTitle>
            <CardDescription>
              Most in-demand skills based on placement statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={skillStats}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="skill" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#0088FE" name="Students with Skill" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </AdminSidebar>
  );
};

export default PlacementAnalytics;
