
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  // Get user name from localStorage (this would come from authentication in a real app)
  const userName = localStorage.getItem('userName') || 'User';
  
  return (
    <>
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

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
    </>
  );
};

export default Header;
