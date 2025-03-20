
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/logo';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-secondary/50 border-t border-border py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo size="lg" />
            <p className="text-sm text-muted-foreground">
              AI-Powered Placement Management System that connects students with recruiters seamlessly.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="mailto:info@jobvault.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">For Students</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/#resume-builder" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/#skill-gap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Skill Gap Analysis
                </Link>
              </li>
              <li>
                <Link to="/#test-prep" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Test Preparation
                </Link>
              </li>
              <li>
                <Link to="/#profile-boost" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Profile Enhancement
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">For Recruiters</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/#ai-screening" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Candidate Screening
                </Link>
              </li>
              <li>
                <Link to="/#test-management" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Test Management
                </Link>
              </li>
              <li>
                <Link to="/#analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Performance Analytics
                </Link>
              </li>
              <li>
                <Link to="/#talent-pool" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Talent Pool Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JobVault. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
