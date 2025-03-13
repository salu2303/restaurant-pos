
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePOS } from '@/context/POSContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, currentUser } = usePOS();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if already logged in
  React.useEffect(() => {
    if (isAuthenticated && currentUser) {
      // Get the redirect path or use default based on role
      const from = location.state?.from?.pathname || 
                  (currentUser.role === 'admin' ? '/reports' : '/tables');
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate, location]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Attempt to login
    const success = login(username, password);
    
    setIsLoading(false);
    
    if (!success) {
      // Reset password field on failure
      setPassword('');
    }
    // The useEffect will handle redirects on success
  };
  
  // Demo credentials
  const loginAsAdmin = () => {
    setUsername('admin');
    setPassword('admin123');
  };
  
  const loginAsServer = () => {
    setUsername('server1');
    setPassword('server123');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Restaurant POS</CardTitle>
          <CardDescription className="text-center">Enter your credentials to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center mb-2">
            Demo Accounts
          </div>
          <div className="flex gap-2 w-full">
            <Button variant="outline" size="sm" className="w-full" onClick={loginAsAdmin}>
              Login as Admin
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={loginAsServer}>
              Login as Server
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
