import { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { DreamApp } from './components/DreamApp';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showSignup) {
      return <SignupPage onSwitchToLogin={() => setShowSignup(false)} />;
    }
    return <LoginPage onSwitchToSignup={() => setShowSignup(true)} />;
  }

  return <DreamApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}