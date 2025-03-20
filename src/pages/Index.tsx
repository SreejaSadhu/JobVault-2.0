
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/home/hero';
import { Features } from '@/components/home/features';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  FileText, 
  FileSearch, 
  Layers, 
  Calendar, 
  LineChart 
} from 'lucide-react';

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 relative">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
    </div>
    
    <div className="container px-4 md:px-6 mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How JobVault Works</h2>
        <p className="text-lg text-muted-foreground">
          Our AI-powered platform streamlines the entire placement process for both students and recruiters.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-6 rounded-xl text-center card-hover">
          <div className="h-16 w-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <FileText className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-medium mb-3">Create Your Profile</h3>
          <p className="text-muted-foreground mb-6">
            Build your student or recruiter profile with our AI-powered tools that highlight your strengths.
          </p>
          <div className="h-1 w-1/3 bg-primary/30 mx-auto rounded-full" />
        </div>
        
        <div className="glass p-6 rounded-xl text-center card-hover">
          <div className="h-16 w-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <FileSearch className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-medium mb-3">AI Matching Technology</h3>
          <p className="text-muted-foreground mb-6">
            Our AI analyzes profiles to create perfect matches between students and job opportunities.
          </p>
          <div className="h-1 w-1/3 bg-primary/30 mx-auto rounded-full" />
        </div>
        
        <div className="glass p-6 rounded-xl text-center card-hover">
          <div className="h-16 w-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Layers className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-medium mb-3">Connect & Collaborate</h3>
          <p className="text-muted-foreground mb-6">
            Schedule tests, interviews, and track your progress throughout the placement process.
          </p>
          <div className="h-1 w-1/3 bg-primary/30 mx-auto rounded-full" />
        </div>
      </div>
    </div>
  </section>
);

const AIFeatures = () => (
  <section className="py-24 bg-secondary/50">
    <div className="container px-4 md:px-6 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AI-Powered Features That Make a Difference
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            JobVault leverages cutting-edge AI to create a seamless placement experience for both students and recruiters.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Resume Analysis & Enhancement</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your resume and offers tailored suggestions to highlight your strengths.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Smart Test Scheduling</h3>
                <p className="text-muted-foreground">
                  AI-optimized test scheduling based on student availability and performance patterns.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Performance Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed insights and analytics to track progress and identify improvement areas.
                </p>
              </div>
            </div>
          </div>
          
          <Button className="mt-8" asChild>
            <Link to="/auth/register">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="relative">
          <div className="glass rounded-2xl p-6 max-w-md mx-auto">
            <div className="mb-6">
              <div className="h-2 w-20 bg-primary/30 rounded-full mb-3" />
              <h3 className="text-xl font-medium mb-2">AI Resume Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Your resume scored 82/100. Here are some suggestions:
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-card p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Technical Skills</span>
                  <span className="text-sm text-primary">92%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '92%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Strong technical skills. Consider adding Cloud certifications.
                </p>
              </div>
              
              <div className="bg-card p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Experience</span>
                  <span className="text-sm text-primary">78%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '78%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Add more quantifiable achievements to your internship.
                </p>
              </div>
              
              <div className="bg-card p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Projects</span>
                  <span className="text-sm text-primary">85%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '85%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Great projects! Add GitHub links for better visibility.
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <div className="text-sm mb-2">Top Companies You Match With:</div>
              <div className="flex flex-wrap gap-2">
                <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                  Amazon
                </div>
                <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                  Microsoft
                </div>
                <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                  Google
                </div>
                <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                  IBM
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -right-6 glass p-3 rounded-lg animate-float">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs">AI suggestion ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[100px]" />
    </div>
    
    <div className="container px-4 md:px-6 mx-auto">
      <div className="glass rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Placement Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and recruiters already using JobVault to streamline their placement process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AIFeatures />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
