import React, { useState } from 'react';
import { LockIcon, MailIcon, EyeIcon, EyeOffIcon } from './icons';
import { auth, db } from '../services/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface CRMLoginProps {
  onLoginSuccess: () => void;
}

const CRMLogin: React.FC<CRMLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('rodrigofranco@example.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Create user profile in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          createdAt: new Date().toISOString(),
          role: 'clinician'
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLoginSuccess();
    } catch (err: any) {
      console.error('Erro de autenticação:', err);
      if (err.code === 'auth/user-not-found') {
        setError('Usuário não encontrado. Crie uma conta.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Senha incorreta. Tente novamente.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este email já está registrado.');
      } else if (err.code === 'auth/weak-password') {
        setError('Senha muito fraca. Use pelo menos 6 caracteres.');
      } else {
        setError(err.message || 'Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LockIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CalculaMed CRM</h1>
          <p className="text-slate-300">Sistema de Gestão Clínica</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6">
            {isSignUp ? 'Criar Conta' : 'Login CRM'}
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignUp ? 'Crie uma senha forte' : 'Digite sua senha'}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 pl-10 pr-10 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-200"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Conectando...
                </>
              ) : (
                isSignUp ? 'Criar Conta' : 'Entrar'
              )}
            </button>
          </form>

          {/* Toggle Sign Up / Login */}
          <div className="mt-6 text-center text-slate-400">
            <p className="text-sm">
              {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-blue-400 hover:text-blue-300 font-semibold transition"
              >
                {isSignUp ? 'Faça login' : 'Crie uma'}
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-400 mb-2">📝 Credenciais de Teste:</p>
            <code className="text-xs bg-slate-900 text-slate-300 p-2 rounded block mb-1">
              Email: demo@test.com
            </code>
            <code className="text-xs bg-slate-900 text-slate-300 p-2 rounded block">
              Senha: 123456
            </code>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-blue-400 text-sm font-semibold mb-1">🔒 Seguro</p>
            <p className="text-slate-400 text-xs">Autenticação Firebase</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-blue-400 text-sm font-semibold mb-1">📊 Dashboard</p>
            <p className="text-slate-400 text-xs">Métricas em tempo real</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-blue-400 text-sm font-semibold mb-1">👥 Pacientes</p>
            <p className="text-slate-400 text-xs">Gestão completa</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-blue-400 text-sm font-semibold mb-1">📋 Notas</p>
            <p className="text-slate-400 text-xs">Histórico clínico</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMLogin;
