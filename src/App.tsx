
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import StudentDashboard from "./pages/dashboard/student";
import AdminDashboard from "./pages/dashboard/admin";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/protected-route";
import StudentProfile from "./pages/student/profile";
import PlacementDrives from "./pages/student/placement-drives";
import ApplicationTracker from "./pages/student/application-tracker";
import Notifications from "./pages/student/notifications";
import UserManagement from "./pages/admin/user-management";
import DriveManagement from "./pages/admin/drive-management";
import ApplicationManagement from "./pages/admin/application-management";
import PlacementAnalytics from "./pages/admin/placement-analytics";
import AdminNotifications from "./pages/admin/notifications";
import EventCalendar from "./pages/admin/event-calendar";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        {/* Student Routes */}
        <Route path="/dashboard/student" element={
          <ProtectedRoute allowedRoles={['student', 'recruiter']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/profile" element={
          <ProtectedRoute allowedRoles={['student', 'recruiter']}>
            <StudentProfile />
          </ProtectedRoute>
        } />
        <Route path="/student/placement-drives" element={
          <ProtectedRoute allowedRoles={['student', 'recruiter']}>
            <PlacementDrives />
          </ProtectedRoute>
        } />
        <Route path="/student/application-tracker" element={
          <ProtectedRoute allowedRoles={['student', 'recruiter']}>
            <ApplicationTracker />
          </ProtectedRoute>
        } />
        <Route path="/student/notifications" element={
          <ProtectedRoute allowedRoles={['student', 'recruiter']}>
            <Notifications />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/user-management" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/drive-management" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DriveManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/application-management" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ApplicationManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/placement-analytics" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PlacementAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/admin/notifications" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminNotifications />
          </ProtectedRoute>
        } />
        <Route path="/admin/event-calendar" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <EventCalendar />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
