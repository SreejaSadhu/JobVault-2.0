
import React from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { Logo } from '@/components/ui/logo';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container px-4 mx-auto py-8">
        <div className="flex justify-between items-center">
          <Logo />
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to home
          </Link>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Join JobVault</h1>
            <p className="text-muted-foreground">
              Create an account to access your college placement portal
            </p>
          </div>
          <AuthForm type="register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
