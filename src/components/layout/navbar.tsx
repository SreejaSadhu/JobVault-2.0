
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/logo';
import { Button } from '@/components/ui/button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        <Logo size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground link-hover">
            Home
          </Link>
          <Link to="/#features" className="text-sm font-medium text-foreground link-hover">
            Features
          </Link>
          <Link to="/#for-students" className="text-sm font-medium text-foreground link-hover">
            For Students
          </Link>
          <Link to="/#for-recruiters" className="text-sm font-medium text-foreground link-hover">
            For Recruiters
          </Link>
          <div className="flex items-center gap-3 ml-4">
            <Button variant="outline" asChild>
              <Link to="/auth/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass backdrop-blur-lg animate-fade-in">
            <nav className="container px-4 py-6 flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-sm font-medium text-foreground p-2" 
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/#features" 
                className="text-sm font-medium text-foreground p-2" 
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link 
                to="/#for-students" 
                className="text-sm font-medium text-foreground p-2" 
                onClick={toggleMenu}
              >
                For Students
              </Link>
              <Link 
                to="/#for-recruiters" 
                className="text-sm font-medium text-foreground p-2" 
                onClick={toggleMenu}
              >
                For Recruiters
              </Link>
              <div className="flex flex-col gap-3 mt-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/auth/login" onClick={toggleMenu}>Log In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/auth/register" onClick={toggleMenu}>Sign Up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
