
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Briefcase, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2 
} from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'student' | 'admin'>('student');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (type === 'register') {
        if (!formData.name) {
          throw new Error('Please enter your name');
        }
        
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (!formData.agreeTerms) {
          throw new Error('You must agree to the terms and conditions');
        }
      }
      
      if (!formData.email) {
        throw new Error('Please enter your email');
      }
      
      if (!formData.password) {
        throw new Error('Please enter your password');
      }

      let success = false;
      
      if (type === 'login') {
        success = await login(formData.email, formData.password, role);
      } else {
        success = await register(formData.name, formData.email, formData.password, role);
      }
      
      if (!success) {
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8 w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">
        {type === 'login' ? 'Welcome back' : 'Create your account'}
      </h2>
      
      <p className="text-muted-foreground text-center mb-8">
        {type === 'login' 
          ? 'Sign in to your JobVault account' 
          : 'Join JobVault and unlock career opportunities'}
      </p>

      {type === 'register' && (
        <div className="flex flex-col space-y-4 mb-6">
          <p className="text-sm font-medium mb-2">I am a:</p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={role === 'student' ? 'default' : 'outline'}
              className="flex items-center justify-center gap-2 py-6"
              onClick={() => setRole('student')}
            >
              <User className="h-5 w-5" />
              <span>Student</span>
            </Button>
            
            <Button
              type="button"
              variant={role === 'admin' ? 'default' : 'outline'}
              className="flex items-center justify-center gap-2 py-6"
              onClick={() => setRole('admin')}
            >
              <Briefcase className="h-5 w-5" />
              <span>Recruiter</span>
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="name"
                name="name"
                placeholder="John Doe"
                className="pl-10"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              className="pl-10"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {type === 'register' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="agreeTerms" 
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, agreeTerms: checked === true }))
                }
              />
              <Label htmlFor="agreeTerms" className="text-sm text-muted-foreground">
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>
          </>
        )}

        {type === 'login' && (
          <div className="flex justify-end">
            <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {type === 'login' ? 'Signing in...' : 'Creating account...'}
            </>
          ) : (
            <>
              {type === 'login' ? 'Sign in' : 'Create account'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="text-center text-sm text-muted-foreground mt-6">
          {type === 'login' ? 
            <>
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-primary hover:underline">
                Create one
              </Link>
            </> : 
            <>
              Already have an account?{' '}
              <Link to="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </>
          }
        </div>
      </form>
    </div>
  );
};
