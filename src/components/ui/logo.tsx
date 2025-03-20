
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const variantClasses = {
    default: 'text-foreground',
    light: 'text-white',
    dark: 'text-foreground',
  };

  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 font-semibold ${sizeClasses[size]} ${variantClasses[variant]} transition-opacity hover:opacity-90`}
    >
      <Briefcase className="inline-block text-primary" strokeWidth={2.5} />
      <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">JobVault</span>
    </Link>
  );
};
