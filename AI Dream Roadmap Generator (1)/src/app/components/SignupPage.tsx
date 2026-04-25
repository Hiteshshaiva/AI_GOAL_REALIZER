import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Sparkles, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from './AuthContext';

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSwitchToLogin }: SignupPageProps) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (pwd: string): boolean => {
    return pwd.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(name, email, password);
      if (!result.success) {
        if (result.error === 'user_exists') {
          setError('user_exists');
        } else {
          setError(result.error || 'An error occurred during signup');
        }
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
            Start your journey to achieving your dreams
          </p>
        </div>

        {/* Signup Card */}
        <Card className="shadow-xl border-2 border-purple-100">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <UserPlus className="w-5 h-5 text-purple-600" />
              </div>
              <CardTitle>Create Account</CardTitle>
            </div>
            <CardDescription>
              Join DreamPath AI and start achieving your dreams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && error === 'user_exists' ? (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <div className="space-y-2">
                      <p>An account with this email already exists.</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onSwitchToLogin}
                        className="border-amber-300 text-amber-800 hover:bg-amber-100"
                      >
                        Go to Login
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {password && (
                  <div className="flex items-center gap-2 text-sm">
                    {validatePassword(password) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">Strong password</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-600">At least 6 characters required</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPassword && (
                  <div className="flex items-center gap-2 text-sm">
                    {password === confirmPassword ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-red-600">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>AI-powered dream roadmaps</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Personalized milestones & tasks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Daily motivational quotes</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Curated learning resources</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
