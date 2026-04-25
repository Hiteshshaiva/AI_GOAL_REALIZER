import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Sparkles, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

interface LoginPageProps {
  onSwitchToSignup: () => void;
}

export function LoginPage({ onSwitchToSignup }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-purple-600" />
            <h1 className="text-purple-600">DreamPath AI</h1>
          </div>
          <p className="text-gray-600">
            Transform your dreams into achievable goals
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-2 border-purple-100">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <LogIn className="w-5 h-5 text-purple-600" />
              </div>
              <CardTitle>Welcome Back</CardTitle>
            </div>
            <CardDescription>
              Sign in to continue your dream journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={onSwitchToSignup}
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Note */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-blue-800 text-sm text-center">
              <strong>Demo Mode:</strong> Create an account to get started. Your data is stored locally in your browser.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
