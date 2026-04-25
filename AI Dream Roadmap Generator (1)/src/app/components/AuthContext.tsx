import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session && session.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || 'User',
          accessToken: session.access_token,
        });
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const supabase = createClient();

      // Sign up the user with metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);

        // Check for specific error messages
        if (error.message.includes('User already registered')) {
          return { success: false, error: 'user_exists' };
        }

        return { success: false, error: error.message || 'An error occurred during signup' };
      }

      if (!data.session) {
        console.error('No session after signup - email confirmation may be required');
        return { success: false, error: 'Email confirmation required. Please check your email.' };
      }

      setUser({
        id: data.user!.id,
        email: data.user!.email!,
        name: name,
        accessToken: data.session.access_token,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.session) {
        console.error('Login error:', error);
        return { success: false, error: error?.message || 'Invalid email or password' };
      }

      setUser({
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata.name || 'User',
        accessToken: data.session.access_token,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}