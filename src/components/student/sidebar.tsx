
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Calendar, 
  BarChart3, 
  Award, 
  Bell, 
  User,
  Briefcase,
  Clock,
  LogOut
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface StudentSidebarProps {
  children?: React.ReactNode;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    toast.success('Logged out successfully');
    navigate('/auth/login');
  };
  
  const navItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      href: '/dashboard/student', 
      active: location.pathname === '/dashboard/student' 
    },
    { 
      icon: User, 
      label: 'Profile', 
      href: '/student/profile', 
      active: location.pathname === '/student/profile' 
    },
    { 
      icon: Briefcase, 
      label: 'Placement Drives', 
      href: '/student/placement-drives', 
      active: location.pathname === '/student/placement-drives' 
    },
    { 
      icon: FileText, 
      label: 'Applications', 
      href: '/student/application-tracker', 
      active: location.pathname === '/student/application-tracker' 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      href: '/student/notifications', 
      active: location.pathname === '/student/notifications' 
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:block">
        <div className="p-6">
          <Logo />
        </div>
        
        <nav className="px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item, index) => (
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
          
          <div className="pt-6 mt-6 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default StudentSidebar;
