
import React from 'react';
import { 
  FileText, 
  BrainCircuit, 
  Calendar, 
  BarChart3, 
  Search, 
  Users, 
  CheckCircle, 
  Award 
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="group glass p-6 rounded-xl card-hover">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export const Features: React.FC = () => {
  const studentFeatures = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "AI Resume Builder",
      description: "Create impressive resumes with AI-powered suggestions and LinkedIn profile import."
    },
    {
      icon: <BrainCircuit className="h-5 w-5" />,
      title: "Skill Gap Analysis",
      description: "Identify areas of improvement and get personalized learning recommendations."
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Test Scheduling",
      description: "Schedule, prepare, and track all your placement tests in one calendar."
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Performance Tracking",
      description: "Visualize your progress and compare with peers to stay motivated."
    }
  ];

  const recruiterFeatures = [
    {
      icon: <Search className="h-5 w-5" />,
      title: "AI Candidate Screening",
      description: "Intelligent screening and ranking based on skills, experience, and test performance."
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Talent Pool Access",
      description: "Browse a curated pool of top candidates matched to your requirements."
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Test Management",
      description: "Design, schedule, and evaluate tests to find the perfect candidates."
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Recruitment Insights",
      description: "Analyze hiring patterns and get AI-powered recommendations."
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connecting Talent with Opportunity
          </h2>
          <p className="text-lg text-muted-foreground">
            JobVault empowers both students and recruiters with AI-driven tools for seamless placement management.
          </p>
        </div>

        <div className="mb-20" id="for-students">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">For Students</h3>
            <p className="text-muted-foreground max-w-xl text-center md:text-right">
              Tools and features designed to help students showcase their talent and find their perfect placement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentFeatures.map((feature, index) => (
              <Feature
                key={`student-feature-${index}`}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        <div id="for-recruiters">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">For Recruiters</h3>
            <p className="text-muted-foreground max-w-xl text-center md:text-right">
              Advanced tools to find, evaluate, and connect with top talent efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recruiterFeatures.map((feature, index) => (
              <Feature
                key={`recruiter-feature-${index}`}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
