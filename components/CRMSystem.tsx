import React, { useState, useEffect } from 'react';
import CRMLogin from './CRMLogin';
import CRMDashboard from './CRMDashboard';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface CRMSystemProps {
  onBackToCalculator?: () => void;
}

const CRMSystem: React.FC<CRMSystemProps> = ({ onBackToCalculator }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    // Auth state will be updated by Firebase listener
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onBackToCalculator) {
        onBackToCalculator();
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  return currentUser ? (
    <CRMDashboard onLogout={handleLogout} />
  ) : (
    <CRMLogin onLoginSuccess={handleLogin} />
  );
};

export default CRMSystem;
