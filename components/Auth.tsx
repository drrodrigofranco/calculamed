import React, { useState } from 'react';
import { CrownIcon, GoogleIcon } from './icons';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        setError("Por favor, preencha todos os campos.");
        return;
    }
    // Login automático para qualquer credencial para facilitar o acesso do usuário
    onLogin();
  };

  const handleGoogleLogin = () => {
      setIsLoading(true);
      // Simulação de delay de rede
      setTimeout(() => {
          setIsLoading(false);
          onLogin();
      }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CrownIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Área Premium Ajuda Saúde</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Desbloqueie acesso ilimitado às calculadoras mais avançadas e complexas do mercado.
                Ferramentas essenciais para UTI, Oncologia e Hepatologia.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Sales Card */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CrownIcon className="w-5 h-5 text-yellow-400" />
                    Plano Profissional
                </h3>
                
                <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span className="text-slate-300">Acesso total a +40 calculadoras</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span className="text-slate-300">Ferramentas avançadas (Drogas Vasoativas, MELD)</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span className="text-slate-300">Sem anúncios (Em breve)</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span className="text-slate-300">Suporte prioritário</span>
                    </li>
                </ul>

                <div className="pt-6 border-t border-slate-700">
                    <p className="text-sm text-slate-400 mb-1">A partir de</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">R$ 29,90</span>
                        <span className="text-slate-400">/mês</span>
                    </div>
                    <button onClick={onLogin} className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded-lg transition">
                        Assinar Agora
                    </button>
                    <p className="text-xs text-center text-slate-500 mt-3">Cancelamento grátis a qualquer momento.</p>
                </div>
            </div>

            {/* Login Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Já é assinante?</h3>
                
                {/* Google Button */}
                <button 
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-50 transition mb-6 shadow-sm"
                >
                    {isLoading ? (
                         <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                    ) : (
                         <GoogleIcon className="w-5 h-5" />
                    )}
                    Continuar com o Google
                </button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-slate-500">ou entre com e-mail</span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <button type="submit" className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3 rounded-lg transition shadow-md">
                        Entrar
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-medical-600 hover:underline">Esqueci minha senha</a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Auth;