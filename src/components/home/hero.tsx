
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Users, Award, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pb-24 pt-36 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex items-center">
              <div className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm backdrop-blur">
                <span className="text-primary font-medium">AI-Powered Platform</span>
                <div className="mx-2 h-1 w-1 rounded-full bg-border" />
                <span className="text-muted-foreground">Just Launched</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="heading-gradient">Revolutionize</span> Your Placement Journey
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Connect students and recruiters through AI-powered profile matching, skill assessment, and resume optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" asChild>
                <Link to="/auth/register">
                  Get Started 
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/#how-it-works">Learn More</Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">For students and recruiters</p>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">AI-driven skill matching</p>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">Smart resume builder</p>
              </div>
            </div>
          </div>

          <div className="lg:block relative">
            <div className="glass p-6 rounded-2xl max-w-md mx-auto lg:mx-0 shadow-xl animate-float">
              <div className="bg-primary/10 rounded-xl p-1 mb-4">
                <div className="bg-card rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">AI Resume Analysis</h3>
                  <div className="space-y-2">
                    <div className="h-2 bg-secondary rounded-full w-full" />
                    <div className="h-2 bg-secondary rounded-full w-4/5" />
                    <div className="h-2 bg-secondary rounded-full w-3/4" />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded flex items-center justify-center">95%</div>
                    <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded flex items-center justify-center">87%</div>
                    <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded flex items-center justify-center">92%</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Resume Optimization</h4>
                    <p className="text-xs text-muted-foreground">AI suggestions to improve your profile</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Perfect Match</h4>
                    <p className="text-xs text-muted-foreground">Find the best candidates or jobs</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Skill Assessment</h4>
                    <p className="text-xs text-muted-foreground">Identify gaps and improvement areas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 glass p-3 rounded-lg shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">Skill Match</p>
                  <p className="text-[10px] text-muted-foreground">98% compatible</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 glass p-3 rounded-lg shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">New Connection</p>
                  <p className="text-[10px] text-muted-foreground">Amazon recruiter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
