
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Award, 
  Settings, 
  Bell,
  BarChart3,
  LogOut
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AdminSidebarProps {
  children?: React.ReactNode;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ children }) => {
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
      href: '/dashboard/admin', 
      active: location.pathname === '/dashboard/admin' 
    },
    { 
      icon: Users, 
      label: 'User Management', 
      href: '/admin/user-management', 
      active: location.pathname === '/admin/user-management' 
    },
    { 
      icon: FileText, 
      label: 'Drive Management', 
      href: '/admin/drive-management', 
      active: location.pathname === '/admin/drive-management' 
    },
    { 
      icon: Award, 
      label: 'Applications', 
      href: '/admin/application-management', 
      active: location.pathname === '/admin/application-management' 
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      href: '/admin/placement-analytics', 
      active: location.pathname === '/admin/placement-analytics' 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      href: '/admin/notifications', 
      active: location.pathname === '/admin/notifications' 
    },
    { 
      icon: Calendar, 
      label: 'Event Calendar', 
      href: '/admin/event-calendar', 
      active: location.pathname === '/admin/event-calendar' 
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

export default AdminSidebar;
